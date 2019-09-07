'use strict';

// A set of useful utilities

function mapClass(classes) {
  return classes.filter(e => typeof e === 'string' || e[1]).map(e => (typeof e === 'string' ? e : e[0])).join(' ');
}
exports.mapClass = mapClass

function ifdef(value, defaultValue) {
  return typeof value !== 'undefined' ? value : defaultValue;
}
exports.ifdef = ifdef

// directives

function vFor(items, cb) {
  return items.map((it, index) => cb(it, index));
}
exports.vFor = vFor

function vLoop(items, cb) {
  return items.map((it, index) => {
    const r = cb(it, index);
    return (typeof r === 'function' && r._nameId && r._nameId === '_factory') ? r() : r;
  });
}
exports.vLoop = vLoop

function vIf(cond, comp1, comp2) {
  if (cond) {
    return comp1;
  }
  if (comp2) {
    return comp2;
  }
  return html.for({})``;
}
exports.vIf = vIf

const animations = new WeakMap();

function vAnimation(cond, comp, key, name) {

  let firstRender = animations.get(key);
  if (firstRender === undefined) firstRender = '';

  let className;
  const animationName = name || 'v-fade';
  let hide = cond ? '' : 'hide';
  animations.set(key, hide);

  if (firstRender === '') {
    className = `${animationName} ${hide}`;
  } else {
    hide = cond ? 'show' : 'hide';
    className = `${animationName} ${hide}`;
  }

  return html.for(key)`<div class="${className}">${comp}</div>`;

}
exports.vAnimation = vAnimation