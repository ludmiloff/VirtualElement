import { Wire } from 'lighterhtml/esm/shared';
import Tagger from 'lighterhtml/esm/tagger';
import { html, svg, render } from 'lighterhtml';

// eslint-disable-next-line prefer-destructuring
const includes = Array.prototype.includes;

// VirtualElement component cache
const components = new Map();

function tearDown(mutations) {
  mutations.forEach((mutation) => {
    components.forEach((comp) => {
      if (comp.hydrated) {
        // do not remove hydrated components
        return;
      }
      if (includes.call(mutation.removedNodes, comp.node) || (!document.body.contains(comp.node))) {
        comp.onDisconnected();
        const _key = comp.key;
        components.delete(_key);
      }
    });
  });
}

const observer = new MutationObserver(tearDown);
observer.observe(document.body, { childList: true, subtree: true, attributes: false });

function attachProperty(prototype, property, options) {
  const { type } = options;

  function get() {
    const v = prototype.__values__[property];
    if (typeof v === 'function') { return v(); }
    return v;
  }

  function set(val) {
    let value;
    if (val === null || val === undefined || typeof val === 'function') {
      value = val;
    } else {
      value = type(val);
    }

    prototype._setPropertyValue(property, value);
  }

  Object.defineProperty(prototype, property, options.computed ? { get } : { get, set });
}

let id$ = 0;
function uid() {
  id$ += 1;
  return id$;
}

function wiredContent(node) {
  // eslint-disable-next-line prefer-destructuring
  const childNodes = node.childNodes;
  // eslint-disable-next-line prefer-destructuring
  const length = childNodes.length;
  // eslint-disable-next-line no-nested-ternary
  return length === 1 ? childNodes[0] : length ? new Wire(childNodes) : node;
}

function Component(Class, args, parent, id) {
  const nextId = uid();
  const _key = { id: nextId };

  function _create() {
    const comp = new Class(args);
    comp.key = _key;
    comp.id = id;
    components.set(_key, comp);
    comp.__parent__ = parent;
    if (parent && parent.stylesRegistry) {
      if (id && parent.stylesRegistry[id]) {
        comp.styles = {...comp.styles, ...parent.stylesRegistry[id]};
      } else {
        const clsName = Class.className || false;
        if (clsName && parent.stylesRegistry[clsName]) {
          comp.styles = {...comp.styles, ...parent.stylesRegistry[clsName]};
        }
      }
    }
    return comp;
  }

  function _factory(props) {
    const comp = components.get(_key) || _create();
    if (props) {
      comp._setProps(props);
    }
    return comp._updater;
  }

  _factory._nameId = '_factory';
  _factory.instance = function() { return components.get(_key) || _create(); };

  return _factory;
}

// VirtualElement encapsulation and setup

class VirtualElement {

  static get properties() {
    return {};
  }

  // simplified version of Component.for factory
  // see https://github.com/WebReflection/hyperHTML/blob/master/esm/classes/Component.js
  // all credits goes to their original author
  static for(parent, id, props) {
    const _id = id === undefined ? 'default' : id;
    const _props = props === undefined ? {} : props;
    if (typeof parent.__childs__ === 'undefined') { parent.__childs__ = {}; }
    if (parent.__childs__[_id]) {
      return parent.__childs__[_id](props);
    }
    parent.__childs__[_id] = Component(this, _props, parent, _id);
    return parent.__childs__[_id];
  }

  constructor() {
    // html renderer internals
    // set hydrated=true for bypass first render and use content provided by SSR
    this.hydrated = false;
    // setting v2 to true will switch to version 2 rendering style
    this.v2 = false;
    this.$ = new Tagger('html');
    this._html = function () {
      return this.$.apply(null, arguments);
    };

    // element identity (for wired nodes)
    this._key = null;
    // element id (inside parent)
    this._id = null;
    // element node (every element template should contain only one root node)
    this._node = null;
    // parent element
    this.__parent__ = null;
    // this element childs
    this.__childs__ = {};

    this._needsRender = true;
    this._connected = false;
    this.__values__ = {};

    // partial render keys
    this.__partKeys__ = {};

    // property watchers
    this.watched = {};

    // styles registry
    this.stylesRegistry = {};
    this.styles = {};

    const props = this.constructor.properties;

    if (props) {
      Object.keys(props).forEach((name) => {
        const prop = props[name];
        attachProperty(this, name, prop);
        if (typeof prop.default !== 'undefined') {
          this.__values__[name] = prop.default;
        }
      });
    }

    this.render = this.render.bind(this);
    this._updater = this._updater.bind(this);
  }

  part(partId) {
    const partKey = this.__partKeys__[partId] || (this.__partKeys__[partId] = {tagger: new Tagger('html'), wire: null});

    return function() {
      // eslint-disable-next-line prefer-spread, prefer-rest-params
      const result = partKey.tagger.apply(null, arguments);
      // eslint-disable-next-line no-return-assign
      return partKey.wire || (partKey.wire = wiredContent(result));
    }    
  }  

  get html() { return this._html; }

  set key(value) { this._key = value; }

  get key() { return this._key; }

  get node() { return this._node; }

  set id(value) { this._id = value; }

  get id() { return this._id; }

  _setPropertyValue(property, value) {
    const oldVal = this.__values__[property];
    this.__values__[property] = value;
    if (oldVal !== value || typeof value === 'object') {
      if (this.watched[property] && this.watched[property](value, oldValue)) {
        return;
      }
      if (!this._needsRender) this.invalidate();
    }
  }

  _setProps(props) {
    if (props) {
      if (this.onUpdated(props)) { return; }
      Object.keys(props).forEach((key) => {
        this._setPropertyValue(key, props[key]);
      });
    }
    // this.invalidate();
  }

  onConnected() {}

  onDisconnected() {
    // fix possible memory leak with container components displaying multiple list items
    if (this.__parent__ && this.__parent__.__childs__) {
      delete this.__parent__.__childs__[this.id];
    }
    this._connected = false;
  }

  onRender() {}

  invalidate() {
    if (!this._needsRender) {
      this._needsRender = true;
      if (this.hydrated) {
        Promise.resolve().then(() => this.deHydrate());
        return;
      }
      Promise.resolve().then(() => {
        if (this._needsRender) this.update();
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  onUpdated(changedProps) {}

  update() {
    if (this._connected) {
      return this._updater();
    }
    return '';
  }

  // ugly, yet working solution to continue normal work after first render
  deHydrate() {
    this._node = null;
    this.hydrated = false;
    this.__parent__.invalidate();
  }
  _updater() {
    const template = this.hydrated ? this._node : this.render();
    const wire = this._node || (this._node = this.v2 ? template : wiredContent(template));
    this.onRender();
    if (!this._connected) {
      this._connected = true;
      setTimeout(() => this.onConnected());
    }
    this._needsRender = false;
    return wire;
  }

  render() {
    return this.html``;
  }

  // data modeling

  vModel(attr) {
    const self = this;
    function x() {
      return self.__values__[attr];
    }
    x.model = () => attr;
    return x;
  }

  // Events
  $emit(event, payload) {
    if (this.__parent__) {
      const [type, modifier] = event.split(':');
      switch (type) {
        case 'update': {
          if (this.__values__[modifier].model) {
            const attr = this.__values__[modifier].model();
            this.__parent__._setPropertyValue(attr, payload);
          } else {
            this.__values__[modifier] = payload;
          }
          this.invalidate();
          break;
        }

        default: {
          if (this.__parent__.handleEvent) {
            this.__parent__.handleEvent(event, payload);
          }
        }
      }
    } else {
      console.log('NO PARENT');
    }
  }
}

import { mapClass, ifdef, vFor, vLoop, vIf, vAnimation } from './helpers';

export {
  VirtualElement,
  Component,
  // helpers
  render,
  html,
  svg,
  mapClass,
  ifdef,
  // directives
  vFor,
  vLoop,
  vIf,
  vAnimation
}

