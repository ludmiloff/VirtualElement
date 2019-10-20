var veljs = (function (document,exports) {
  'use strict';

  

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }

    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /*! (c) Andrea Giammarchi - ISC */
  var Wire = function (slice, proto) {
    proto = Wire.prototype;
    proto.ELEMENT_NODE = 1;
    proto.nodeType = 111;

    proto.remove = function (keepFirst) {
      var childNodes = this.childNodes;
      var first = this.firstChild;
      var last = this.lastChild;
      this._ = null;

      if (keepFirst && childNodes.length === 2) {
        last.parentNode.removeChild(last);
      } else {
        var range = this.ownerDocument.createRange();
        range.setStartBefore(keepFirst ? childNodes[1] : first);
        range.setEndAfter(last);
        range.deleteContents();
      }

      return first;
    };

    proto.valueOf = function (forceAppend) {
      var fragment = this._;
      var noFragment = fragment == null;
      if (noFragment) fragment = this._ = this.ownerDocument.createDocumentFragment();

      if (noFragment || forceAppend) {
        for (var n = this.childNodes, i = 0, l = n.length; i < l; i++) {
          fragment.appendChild(n[i]);
        }
      }

      return fragment;
    };

    return Wire;

    function Wire(childNodes) {
      var nodes = this.childNodes = slice.call(childNodes, 0);
      this.firstChild = nodes[0];
      this.lastChild = nodes[nodes.length - 1];
      this.ownerDocument = nodes[0].ownerDocument;
      this._ = null;
    }
  }([].slice);

  var isArray = Array.isArray;
  var wireType = Wire.prototype.nodeType;
  Object.freeze(Hole);

  function Hole(type, args) {
    this.type = type;
    this.args = args;
  }

  /*! (c) Andrea Giammarchi - ISC */
  var createContent = function (document) {

    var FRAGMENT = 'fragment';
    var TEMPLATE = 'template';
    var HAS_CONTENT = 'content' in create(TEMPLATE);
    var createHTML = HAS_CONTENT ? function (html) {
      var template = create(TEMPLATE);
      template.innerHTML = html;
      return template.content;
    } : function (html) {
      var content = create(FRAGMENT);
      var template = create(TEMPLATE);
      var childNodes = null;

      if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
        var selector = RegExp.$1;
        template.innerHTML = '<table>' + html + '</table>';
        childNodes = template.querySelectorAll(selector);
      } else {
        template.innerHTML = html;
        childNodes = template.childNodes;
      }

      append(content, childNodes);
      return content;
    };
    return function createContent(markup, type) {
      return (type === 'svg' ? createSVG : createHTML)(markup);
    };

    function append(root, childNodes) {
      var length = childNodes.length;

      while (length--) {
        root.appendChild(childNodes[0]);
      }
    }

    function create(element) {
      return element === FRAGMENT ? document.createDocumentFragment() : document.createElementNS('http://www.w3.org/1999/xhtml', element);
    } // it could use createElementNS when hasNode is there
    // but this fallback is equally fast and easier to maintain
    // it is also battle tested already in all IE


    function createSVG(svg) {
      var content = create(FRAGMENT);
      var template = create('div');
      template.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svg + '</svg>';
      append(content, template.firstChild.childNodes);
      return content;
    }
  }(document);

  /*! (c) Andrea Giammarchi - ISC */
  var self = null ||
  /* istanbul ignore next */
  {};

  try {
    self.Map = Map;
  } catch (Map) {
    self.Map = function Map() {
      var i = 0;
      var k = [];
      var v = [];
      return {
        "delete": function _delete(key) {
          var had = contains(key);

          if (had) {
            k.splice(i, 1);
            v.splice(i, 1);
          }

          return had;
        },
        forEach: function forEach(callback, context) {
          k.forEach(function (key, i) {
            callback.call(context, v[i], key, this);
          }, this);
        },
        get: function get(key) {
          return contains(key) ? v[i] : void 0;
        },
        has: function has(key) {
          return contains(key);
        },
        set: function set(key, value) {
          v[contains(key) ? i : k.push(key) - 1] = value;
          return this;
        }
      };

      function contains(v) {
        i = k.indexOf(v);
        return -1 < i;
      }
    };
  }

  var Map$1 = self.Map;

  var iOF = [].indexOf;
  var append = function append(get, parent, children, start, end, before) {
    var isSelect = 'selectedIndex' in parent;
    var noSelection = isSelect;

    while (start < end) {
      var child = get(children[start], 1);
      parent.insertBefore(child, before);

      if (isSelect && noSelection && child.selected) {
        noSelection = !noSelection;
        var selectedIndex = parent.selectedIndex;
        parent.selectedIndex = selectedIndex < 0 ? start : iOF.call(parent.querySelectorAll('option'), child);
      }

      start++;
    }
  };
  var eqeq = function eqeq(a, b) {
    return a == b;
  };
  var identity = function identity(O) {
    return O;
  };
  var indexOf = function indexOf(moreNodes, moreStart, moreEnd, lessNodes, lessStart, lessEnd, compare) {
    var length = lessEnd - lessStart;
    /* istanbul ignore if */

    if (length < 1) return -1;

    while (moreEnd - moreStart >= length) {
      var m = moreStart;
      var l = lessStart;

      while (m < moreEnd && l < lessEnd && compare(moreNodes[m], lessNodes[l])) {
        m++;
        l++;
      }

      if (l === lessEnd) return moreStart;
      moreStart = m + 1;
    }

    return -1;
  };
  var isReversed = function isReversed(futureNodes, futureEnd, currentNodes, currentStart, currentEnd, compare) {
    while (currentStart < currentEnd && compare(currentNodes[currentStart], futureNodes[futureEnd - 1])) {
      currentStart++;
      futureEnd--;
    }
    return futureEnd === 0;
  };
  var next = function next(get, list, i, length, before) {
    return i < length ? get(list[i], 0) : 0 < i ? get(list[i - 1], -0).nextSibling : before;
  };
  var remove = function remove(get, parent, children, start, end) {
    if (end - start < 2) parent.removeChild(get(children[start], -1));else {
      var range = parent.ownerDocument.createRange();
      range.setStartBefore(get(children[start], -1));
      range.setEndAfter(get(children[end - 1], -1));
      range.deleteContents();
    }
  }; // - - - - - - - - - - - - - - - - - - -
  // diff related constants and utilities
  // - - - - - - - - - - - - - - - - - - -

  var DELETION = -1;
  var INSERTION = 1;
  var SKIP = 0;
  var SKIP_OND = 50;

  var HS = function HS(futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges) {
    var k = 0;
    /* istanbul ignore next */

    var minLen = futureChanges < currentChanges ? futureChanges : currentChanges;
    var link = Array(minLen++);
    var tresh = Array(minLen);
    tresh[0] = -1;

    for (var i = 1; i < minLen; i++) {
      tresh[i] = currentEnd;
    }

    var keymap = new Map$1();

    for (var _i = currentStart; _i < currentEnd; _i++) {
      keymap.set(currentNodes[_i], _i);
    }

    for (var _i2 = futureStart; _i2 < futureEnd; _i2++) {
      var idxInOld = keymap.get(futureNodes[_i2]);

      if (idxInOld != null) {
        k = findK(tresh, minLen, idxInOld);
        /* istanbul ignore else */

        if (-1 < k) {
          tresh[k] = idxInOld;
          link[k] = {
            newi: _i2,
            oldi: idxInOld,
            prev: link[k - 1]
          };
        }
      }
    }

    k = --minLen;
    --currentEnd;

    while (tresh[k] > currentEnd) {
      --k;
    }

    minLen = currentChanges + futureChanges - k;
    var diff = Array(minLen);
    var ptr = link[k];
    --futureEnd;

    while (ptr) {
      var _ptr = ptr,
          newi = _ptr.newi,
          oldi = _ptr.oldi;

      while (futureEnd > newi) {
        diff[--minLen] = INSERTION;
        --futureEnd;
      }

      while (currentEnd > oldi) {
        diff[--minLen] = DELETION;
        --currentEnd;
      }

      diff[--minLen] = SKIP;
      --futureEnd;
      --currentEnd;
      ptr = ptr.prev;
    }

    while (futureEnd >= futureStart) {
      diff[--minLen] = INSERTION;
      --futureEnd;
    }

    while (currentEnd >= currentStart) {
      diff[--minLen] = DELETION;
      --currentEnd;
    }

    return diff;
  }; // this is pretty much the same petit-dom code without the delete map part
  // https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L556-L561


  var OND = function OND(futureNodes, futureStart, rows, currentNodes, currentStart, cols, compare) {
    var length = rows + cols;
    var v = [];
    var d, k, r, c, pv, cv, pd;

    outer: for (d = 0; d <= length; d++) {
      /* istanbul ignore if */
      if (d > SKIP_OND) return null;
      pd = d - 1;
      /* istanbul ignore next */

      pv = d ? v[d - 1] : [0, 0];
      cv = v[d] = [];

      for (k = -d; k <= d; k += 2) {
        if (k === -d || k !== d && pv[pd + k - 1] < pv[pd + k + 1]) {
          c = pv[pd + k + 1];
        } else {
          c = pv[pd + k - 1] + 1;
        }

        r = c - k;

        while (c < cols && r < rows && compare(currentNodes[currentStart + c], futureNodes[futureStart + r])) {
          c++;
          r++;
        }

        if (c === cols && r === rows) {
          break outer;
        }

        cv[d + k] = c;
      }
    }

    var diff = Array(d / 2 + length / 2);
    var diffIdx = diff.length - 1;

    for (d = v.length - 1; d >= 0; d--) {
      while (c > 0 && r > 0 && compare(currentNodes[currentStart + c - 1], futureNodes[futureStart + r - 1])) {
        // diagonal edge = equality
        diff[diffIdx--] = SKIP;
        c--;
        r--;
      }

      if (!d) break;
      pd = d - 1;
      /* istanbul ignore next */

      pv = d ? v[d - 1] : [0, 0];
      k = c - r;

      if (k === -d || k !== d && pv[pd + k - 1] < pv[pd + k + 1]) {
        // vertical edge = insertion
        r--;
        diff[diffIdx--] = INSERTION;
      } else {
        // horizontal edge = deletion
        c--;
        diff[diffIdx--] = DELETION;
      }
    }

    return diff;
  };

  var applyDiff = function applyDiff(diff, get, parentNode, futureNodes, futureStart, currentNodes, currentStart, currentLength, before) {
    var live = new Map$1();
    var length = diff.length;
    var currentIndex = currentStart;
    var i = 0;

    while (i < length) {
      switch (diff[i++]) {
        case SKIP:
          futureStart++;
          currentIndex++;
          break;

        case INSERTION:
          // TODO: bulk appends for sequential nodes
          live.set(futureNodes[futureStart], 1);
          append(get, parentNode, futureNodes, futureStart++, futureStart, currentIndex < currentLength ? get(currentNodes[currentIndex], 0) : before);
          break;

        case DELETION:
          currentIndex++;
          break;
      }
    }

    i = 0;

    while (i < length) {
      switch (diff[i++]) {
        case SKIP:
          currentStart++;
          break;

        case DELETION:
          // TODO: bulk removes for sequential nodes
          if (live.has(currentNodes[currentStart])) currentStart++;else remove(get, parentNode, currentNodes, currentStart++, currentStart);
          break;
      }
    }
  };

  var findK = function findK(ktr, length, j) {
    var lo = 1;
    var hi = length;

    while (lo < hi) {
      var mid = (lo + hi) / 2 >>> 0;
      if (j < ktr[mid]) hi = mid;else lo = mid + 1;
    }

    return lo;
  };

  var smartDiff = function smartDiff(get, parentNode, futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges, currentLength, compare, before) {
    applyDiff(OND(futureNodes, futureStart, futureChanges, currentNodes, currentStart, currentChanges, compare) || HS(futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges), get, parentNode, futureNodes, futureStart, currentNodes, currentStart, currentLength, before);
  };

  /*! (c) 2018 Andrea Giammarchi (ISC) */

  var domdiff = function domdiff(parentNode, // where changes happen
  currentNodes, // Array of current items/nodes
  futureNodes, // Array of future items/nodes
  options // optional object with one of the following properties
  //  before: domNode
  //  compare(generic, generic) => true if same generic
  //  node(generic) => Node
  ) {
    if (!options) options = {};
    var compare = options.compare || eqeq;
    var get = options.node || identity;
    var before = options.before == null ? null : get(options.before, 0);
    var currentLength = currentNodes.length;
    var currentEnd = currentLength;
    var currentStart = 0;
    var futureEnd = futureNodes.length;
    var futureStart = 0; // common prefix

    while (currentStart < currentEnd && futureStart < futureEnd && compare(currentNodes[currentStart], futureNodes[futureStart])) {
      currentStart++;
      futureStart++;
    } // common suffix


    while (currentStart < currentEnd && futureStart < futureEnd && compare(currentNodes[currentEnd - 1], futureNodes[futureEnd - 1])) {
      currentEnd--;
      futureEnd--;
    }

    var currentSame = currentStart === currentEnd;
    var futureSame = futureStart === futureEnd; // same list

    if (currentSame && futureSame) return futureNodes; // only stuff to add

    if (currentSame && futureStart < futureEnd) {
      append(get, parentNode, futureNodes, futureStart, futureEnd, next(get, currentNodes, currentStart, currentLength, before));
      return futureNodes;
    } // only stuff to remove


    if (futureSame && currentStart < currentEnd) {
      remove(get, parentNode, currentNodes, currentStart, currentEnd);
      return futureNodes;
    }

    var currentChanges = currentEnd - currentStart;
    var futureChanges = futureEnd - futureStart;
    var i = -1; // 2 simple indels: the shortest sequence is a subsequence of the longest

    if (currentChanges < futureChanges) {
      i = indexOf(futureNodes, futureStart, futureEnd, currentNodes, currentStart, currentEnd, compare); // inner diff

      if (-1 < i) {
        append(get, parentNode, futureNodes, futureStart, i, get(currentNodes[currentStart], 0));
        append(get, parentNode, futureNodes, i + currentChanges, futureEnd, next(get, currentNodes, currentEnd, currentLength, before));
        return futureNodes;
      }
    }
    /* istanbul ignore else */
    else if (futureChanges < currentChanges) {
        i = indexOf(currentNodes, currentStart, currentEnd, futureNodes, futureStart, futureEnd, compare); // outer diff

        if (-1 < i) {
          remove(get, parentNode, currentNodes, currentStart, i);
          remove(get, parentNode, currentNodes, i + futureChanges, currentEnd);
          return futureNodes;
        }
      } // common case with one replacement for many nodes
    // or many nodes replaced for a single one

    /* istanbul ignore else */


    if (currentChanges < 2 || futureChanges < 2) {
      append(get, parentNode, futureNodes, futureStart, futureEnd, get(currentNodes[currentStart], 0));
      remove(get, parentNode, currentNodes, currentStart, currentEnd);
      return futureNodes;
    } // the half match diff part has been skipped in petit-dom
    // https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L391-L397
    // accordingly, I think it's safe to skip in here too
    // if one day it'll come out like the speediest thing ever to do
    // then I might add it in here too
    // Extra: before going too fancy, what about reversed lists ?
    //        This should bail out pretty quickly if that's not the case.


    if (currentChanges === futureChanges && isReversed(futureNodes, futureEnd, currentNodes, currentStart, currentEnd, compare)) {
      append(get, parentNode, futureNodes, futureStart, futureEnd, next(get, currentNodes, currentEnd, currentLength, before));
      return futureNodes;
    } // last resort through a smart diff


    smartDiff(get, parentNode, futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges, currentLength, compare, before);
    return futureNodes;
  };

  /*! (c) Andrea Giammarchi - ISC */
  var self$1 = null ||
  /* istanbul ignore next */
  {};

  try {
    self$1.WeakMap = WeakMap;
  } catch (WeakMap) {
    // this could be better but 90% of the time
    // it's everything developers need as fallback
    self$1.WeakMap = function (id, Object) {

      var dP = Object.defineProperty;
      var hOP = Object.hasOwnProperty;
      var proto = WeakMap.prototype;

      proto["delete"] = function (key) {
        return this.has(key) && delete key[this._];
      };

      proto.get = function (key) {
        return this.has(key) ? key[this._] : void 0;
      };

      proto.has = function (key) {
        return hOP.call(key, this._);
      };

      proto.set = function (key, value) {
        dP(key, this._, {
          configurable: true,
          value: value
        });
        return this;
      };

      return WeakMap;

      function WeakMap(iterable) {
        dP(this, '_', {
          value: '_@ungap/weakmap' + id++
        });
        if (iterable) iterable.forEach(add, this);
      }

      function add(pair) {
        this.set(pair[0], pair[1]);
      }
    }(Math.random(), Object);
  }

  var WeakMap$1 = self$1.WeakMap;

  /*! (c) Andrea Giammarchi - ISC */
  var importNode = function (document, appendChild, cloneNode, createTextNode, importNode) {
    var _native = importNode in document; // IE 11 has problems with cloning templates:
    // it "forgets" empty childNodes. This feature-detects that.


    var fragment = document.createDocumentFragment();
    fragment[appendChild](document[createTextNode]('g'));
    fragment[appendChild](document[createTextNode](''));
    var content = _native ? document[importNode](fragment, true) : fragment[cloneNode](true);
    return content.childNodes.length < 2 ? function importNode(node, deep) {
      var clone = node[cloneNode]();

      for (var childNodes = node.childNodes || [], length = childNodes.length, i = 0; deep && i < length; i++) {
        clone[appendChild](importNode(childNodes[i], deep));
      }

      return clone;
    } : _native ? document[importNode] : function (node, deep) {
      return node[cloneNode](!!deep);
    };
  }(document, 'appendChild', 'cloneNode', 'createTextNode', 'importNode');

  var trim = ''.trim || function () {
    return String(this).replace(/^\s+|\s+/g, '');
  };

  /*! (c) Andrea Giammarchi - ISC */
  // Custom
  var UID = '-' + Math.random().toFixed(6) + '%'; //                           Edge issue!

  var UID_IE = false;

  try {
    if (!function (template, content, tabindex) {
      return content in template && (template.innerHTML = '<p ' + tabindex + '="' + UID + '"></p>', template[content].childNodes[0].getAttribute(tabindex) == UID);
    }(document.createElement('template'), 'content', 'tabindex')) {
      UID = '_dt: ' + UID.slice(1, -1) + ';';
      UID_IE = true;
    }
  } catch (meh) {}

  var UIDC = '<!--' + UID + '-->'; // DOM

  var COMMENT_NODE = 8;
  var ELEMENT_NODE = 1;
  var TEXT_NODE = 3;
  var SHOULD_USE_TEXT_CONTENT = /^(?:style|textarea)$/i;
  var VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;

  /*! (c) Andrea Giammarchi - ISC */
  function domsanitizer (template) {
    return template.join(UIDC).replace(selfClosing, fullClosing).replace(attrSeeker, attrReplacer);
  }
  var spaces = ' \\f\\n\\r\\t';
  var almostEverything = '[^' + spaces + '\\/>"\'=]+';
  var attrName = '[' + spaces + ']+' + almostEverything;
  var tagName = '<([A-Za-z]+[A-Za-z0-9:._-]*)((?:';
  var attrPartials = '(?:\\s*=\\s*(?:\'[^\']*?\'|"[^"]*?"|<[^>]*?>|' + almostEverything.replace('\\/', '') + '))?)';
  var attrSeeker = new RegExp(tagName + attrName + attrPartials + '+)([' + spaces + ']*/?>)', 'g');
  var selfClosing = new RegExp(tagName + attrName + attrPartials + '*)([' + spaces + ']*/>)', 'g');
  var findAttributes = new RegExp('(' + attrName + '\\s*=\\s*)([\'"]?)' + UIDC + '\\2', 'gi');

  function attrReplacer($0, $1, $2, $3) {
    return '<' + $1 + $2.replace(findAttributes, replaceAttributes) + $3;
  }

  function replaceAttributes($0, $1, $2) {
    return $1 + ($2 || '"') + UID + ($2 || '"');
  }

  function fullClosing($0, $1, $2) {
    return VOID_ELEMENTS.test($1) ? $0 : '<' + $1 + $2 + '></' + $1 + '>';
  }

  function find(node, path) {
    var length = path.length;
    var i = 0;

    while (i < length) {
      node = node.childNodes[path[i++]];
    }

    return node;
  }

  function parse(node, holes, parts, path) {
    var childNodes = node.childNodes;
    var length = childNodes.length;
    var i = 0;

    while (i < length) {
      var child = childNodes[i];

      switch (child.nodeType) {
        case ELEMENT_NODE:
          var childPath = path.concat(i);
          parseAttributes(child, holes, parts, childPath);
          parse(child, holes, parts, childPath);
          break;

        case COMMENT_NODE:
          var textContent = child.textContent;

          if (textContent === UID) {
            parts.shift();
            holes.push( // basicHTML or other non standard engines
            // might end up having comments in nodes
            // where they shouldn't, hence this check.
            SHOULD_USE_TEXT_CONTENT.test(node.nodeName) ? Text(node, path) : Any(child, path.concat(i)));
          } else {
            switch (textContent.slice(0, 2)) {
              case '/*':
                if (textContent.slice(-2) !== '*/') break;

              case "\uD83D\uDC7B":
                // ghost
                node.removeChild(child);
                i--;
                length--;
            }
          }

          break;

        case TEXT_NODE:
          // the following ignore is actually covered by browsers
          // only basicHTML ends up on previous COMMENT_NODE case
          // instead of TEXT_NODE because it knows nothing about
          // special style or textarea behavior

          /* istanbul ignore if */
          if (SHOULD_USE_TEXT_CONTENT.test(node.nodeName) && trim.call(child.textContent) === UIDC) {
            parts.shift();
            holes.push(Text(node, path));
          }

          break;
      }

      i++;
    }
  }

  function parseAttributes(node, holes, parts, path) {
    var cache = new Map$1();
    var attributes = node.attributes;
    var remove = [];
    var array = remove.slice.call(attributes, 0);
    var length = array.length;
    var i = 0;

    while (i < length) {
      var attribute = array[i++];
      var direct = attribute.value === UID;
      var sparse;

      if (direct || 1 < (sparse = attribute.value.split(UIDC)).length) {
        var name = attribute.name; // the following ignore is covered by IE
        // and the IE9 double viewBox test

        /* istanbul ignore else */

        if (!cache.has(name)) {
          var realName = parts.shift().replace(direct ? /^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/ : // TODO: while working on yet another IE/Edge bug I've realized
          //        the current not direct logic easily breaks there
          //        because the `name` might not be the real needed one.
          //        Use a better RegExp to find last attribute instead
          //        of trusting `name` is what we are looking for.
          //        Thanks IE/Edge, I hate you both.
          new RegExp('^(?:|[\\S\\s]*?\\s)(' + name + ')\\s*=\\s*(\'|")', 'i'), '$1');
          var value = attributes[realName] || // the following ignore is covered by browsers
          // while basicHTML is already case-sensitive

          /* istanbul ignore next */
          attributes[realName.toLowerCase()];
          cache.set(name, value);
          if (direct) holes.push(Attr(value, path, realName, null));else {
            var skip = sparse.length - 2;

            while (skip--) {
              parts.shift();
            }

            holes.push(Attr(value, path, realName, sparse));
          }
        }

        remove.push(attribute);
      }
    }

    length = remove.length;
    i = 0;
    /* istanbul ignore next */

    var cleanValue = 0 < length && UID_IE && !('ownerSVGElement' in node);

    while (i < length) {
      // Edge HTML bug #16878726
      var attr = remove[i++]; // IE/Edge bug lighterhtml#63 - clean the value or it'll persist

      /* istanbul ignore next */

      if (cleanValue) attr.value = ''; // IE/Edge bug lighterhtml#64 - don't use removeAttributeNode

      node.removeAttribute(attr.name);
    } // This is a very specific Firefox/Safari issue
    // but since it should be a not so common pattern,
    // it's probably worth patching regardless.
    // Basically, scripts created through strings are death.
    // You need to create fresh new scripts instead.
    // TODO: is there any other node that needs such nonsense?


    var nodeName = node.nodeName;

    if (/^script$/i.test(nodeName)) {
      // this used to be like that
      // var script = createElement(node, nodeName);
      // then Edge arrived and decided that scripts created
      // through template documents aren't worth executing
      // so it became this ... hopefully it won't hurt in the wild
      var script = document.createElement(nodeName);
      length = attributes.length;
      i = 0;

      while (i < length) {
        script.setAttributeNode(attributes[i++].cloneNode(true));
      }

      script.textContent = node.textContent;
      node.parentNode.replaceChild(script, node);
    }
  }

  function Any(node, path) {
    return {
      type: 'any',
      node: node,
      path: path
    };
  }

  function Attr(node, path, name, sparse) {
    return {
      type: 'attr',
      node: node,
      path: path,
      name: name,
      sparse: sparse
    };
  }

  function Text(node, path) {
    return {
      type: 'text',
      node: node,
      path: path
    };
  }

  // globals
  var parsed = new WeakMap$1();
  var referenced = new WeakMap$1();

  function createInfo(options, template) {
    var markup = (options.convert || domsanitizer)(template);
    var transform = options.transform;
    if (transform) markup = transform(markup);
    var content = createContent(markup, options.type);
    cleanContent(content);
    var holes = [];
    parse(content, holes, template.slice(0), []);
    var info = {
      content: content,
      updates: function updates(content) {
        var updates = [];
        var len = holes.length;
        var i = 0;
        var off = 0;

        while (i < len) {
          var info = holes[i++];
          var node = find(content, info.path);

          switch (info.type) {
            case 'any':
              updates.push({
                fn: options.any(node, []),
                sparse: false
              });
              break;

            case 'attr':
              var sparse = info.sparse;
              var fn = options.attribute(node, info.name, info.node);
              if (sparse === null) updates.push({
                fn: fn,
                sparse: false
              });else {
                off += sparse.length - 2;
                updates.push({
                  fn: fn,
                  sparse: true,
                  values: sparse
                });
              }
              break;

            case 'text':
              updates.push({
                fn: options.text(node),
                sparse: false
              });
              node.textContent = '';
              break;
          }
        }

        len += off;
        return function () {
          var length = arguments.length;

          if (len !== length - 1) {
            throw new Error(length - 1 + ' values instead of ' + len + '\n' + template.join('${value}'));
          }

          var i = 1;
          var off = 1;

          while (i < length) {
            var update = updates[i - off];

            if (update.sparse) {
              var values = update.values;
              var value = values[0];
              var j = 1;
              var l = values.length;
              off += l - 2;

              while (j < l) {
                value += arguments[i++] + values[j++];
              }

              update.fn(value);
            } else update.fn(arguments[i++]);
          }

          return content;
        };
      }
    };
    parsed.set(template, info);
    return info;
  }

  function createDetails(options, template) {
    var info = parsed.get(template) || createInfo(options, template);
    var content = importNode.call(document, info.content, true);
    var details = {
      content: content,
      template: template,
      updates: info.updates(content)
    };
    referenced.set(options, details);
    return details;
  }

  function domtagger(options) {
    return function (template) {
      var details = referenced.get(options);
      if (details == null || details.template !== template) details = createDetails(options, template);
      details.updates.apply(null, arguments);
      return details.content;
    };
  }

  function cleanContent(fragment) {
    var childNodes = fragment.childNodes;
    var i = childNodes.length;

    while (i--) {
      var child = childNodes[i];

      if (child.nodeType !== 1 && trim.call(child.textContent).length === 0) {
        fragment.removeChild(child);
      }
    }
  }

  /*! (c) Andrea Giammarchi - ISC */
  var hyperStyle = function () {

    var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
    var hyphen = /([^A-Z])([A-Z]+)/g;
    return function hyperStyle(node, original) {
      return 'ownerSVGElement' in node ? svg(node, original) : update(node.style, false);
    };

    function ized($0, $1, $2) {
      return $1 + '-' + $2.toLowerCase();
    }

    function svg(node, original) {
      var style;
      if (original) style = original.cloneNode(true);else {
        node.setAttribute('style', '--hyper:style;');
        style = node.getAttributeNode('style');
      }
      style.value = '';
      node.setAttributeNode(style);
      return update(style, true);
    }

    function toStyle(object) {
      var key,
          css = [];

      for (key in object) {
        css.push(key.replace(hyphen, ized), ':', object[key], ';');
      }

      return css.join('');
    }

    function update(style, isSVG) {
      var oldType, oldValue;
      return function (newValue) {
        var info, key, styleValue, value;

        switch (typeof(newValue)) {
          case 'object':
            if (newValue) {
              if (oldType === 'object') {
                if (!isSVG) {
                  if (oldValue !== newValue) {
                    for (key in oldValue) {
                      if (!(key in newValue)) {
                        style[key] = '';
                      }
                    }
                  }
                }
              } else {
                if (isSVG) style.value = '';else style.cssText = '';
              }

              info = isSVG ? {} : style;

              for (key in newValue) {
                value = newValue[key];
                styleValue = typeof value === 'number' && !IS_NON_DIMENSIONAL.test(key) ? value + 'px' : value;
                if (!isSVG && /^--/.test(key)) info.setProperty(key, styleValue);else info[key] = styleValue;
              }

              oldType = 'object';
              if (isSVG) style.value = toStyle(oldValue = info);else oldValue = newValue;
              break;
            }

          default:
            if (oldValue != newValue) {
              oldType = 'string';
              oldValue = newValue;
              if (isSVG) style.value = newValue || '';else style.cssText = newValue || '';
            }

            break;
        }
      };
    }
  }();

  var OWNER_SVG_ELEMENT = 'ownerSVGElement'; // returns nodes from wires and components

  var asNode = function asNode(item, i) {
    return item.nodeType === wireType ? 1 / i < 0 ? i ? item.remove(true) : item.lastChild : i ? item.valueOf(true) : item.firstChild : item;
  }; // returns true if domdiff can handle the value


  var canDiff = function canDiff(value) {
    return 'ELEMENT_NODE' in value;
  }; // generic attributes helpers


  var hyperAttribute = function hyperAttribute(node, original) {
    var oldValue;
    var owner = false;
    var attribute = original.cloneNode(true);
    return function (newValue) {
      if (oldValue !== newValue) {
        oldValue = newValue;

        if (attribute.value !== newValue) {
          if (newValue == null) {
            if (owner) {
              owner = false;
              node.removeAttributeNode(attribute);
            }

            attribute.value = newValue;
          } else {
            attribute.value = newValue;

            if (!owner) {
              owner = true;
              node.setAttributeNode(attribute);
            }
          }
        }
      }
    };
  }; // events attributes helpers


  var hyperEvent = function hyperEvent(node, name) {
    var oldValue;
    var type = name.slice(2);
    if (name.toLowerCase() in node) type = type.toLowerCase();
    return function (newValue) {
      if (oldValue !== newValue) {
        if (oldValue) node.removeEventListener(type, oldValue, false);
        oldValue = newValue;
        if (newValue) node.addEventListener(type, newValue, false);
      }
    };
  }; // special attributes helpers


  var hyperProperty = function hyperProperty(node, name) {
    var oldValue;
    return function (newValue) {
      if (oldValue !== newValue) {
        oldValue = newValue;

        if (node[name] !== newValue) {
          if (newValue == null) {
            // cleanup before dropping the attribute to fix IE/Edge gotcha
            node[name] = '';
            node.removeAttribute(name);
          } else node[name] = newValue;
        }
      }
    };
  }; // special hooks helpers


  var hyperRef = function hyperRef(node) {
    return function (ref) {
      ref.current = node;
    };
  };

  var hyperSetter = function hyperSetter(node, name) {
    return function (value) {
      node[name] = value;
    };
  }; // list of attributes that should not be directly assigned


  var readOnly = /^(?:form|list)$/i; // reused every slice time

  var slice = [].slice; // simplifies text node creation

  var text = function text(node, _text) {
    return node.ownerDocument.createTextNode(_text);
  };

  function Tagger(type) {
    this.type = type;
    return domtagger(this);
  }
  Tagger.prototype = {
    // there are four kind of attributes, and related behavior:
    //  * events, with a name starting with `on`, to add/remove event listeners
    //  * special, with a name present in their inherited prototype, accessed directly
    //  * regular, accessed through get/setAttribute standard DOM methods
    //  * style, the only regular attribute that also accepts an object as value
    //    so that you can style=${{width: 120}}. In this case, the behavior has been
    //    fully inspired by Preact library and its simplicity.
    attribute: function attribute(node, name, original) {
      switch (name) {
        case 'class':
          if (OWNER_SVG_ELEMENT in node) return hyperAttribute(node, original);
          name = 'className';

        case 'data':
        case 'props':
          return hyperProperty(node, name);

        case 'style':
          return hyperStyle(node, original, OWNER_SVG_ELEMENT in node);

        case 'ref':
          return hyperRef(node);

        default:
          if (name.slice(0, 1) === '.') return hyperSetter(node, name.slice(1));
          if (name.slice(0, 2) === 'on') return hyperEvent(node, name);
          if (name in node && !(OWNER_SVG_ELEMENT in node || readOnly.test(name))) return hyperProperty(node, name);
          return hyperAttribute(node, original);
      }
    },
    // in a hyper(node)`<div>${content}</div>` case
    // everything could happen:
    //  * it's a JS primitive, stored as text
    //  * it's null or undefined, the node should be cleaned
    //  * it's a promise, update the content once resolved
    //  * it's an explicit intent, perform the desired operation
    //  * it's an Array, resolve all values if Promises and/or
    //    update the node with the resulting list of content
    any: function any(node, childNodes) {
      var diffOptions = {
        node: asNode,
        before: node
      };
      var nodeType = OWNER_SVG_ELEMENT in node ?
      /* istanbul ignore next */
      'svg' : 'html';
      var fastPath = false;
      var oldValue;

      var anyContent = function anyContent(value) {
        switch (typeof(value)) {
          case 'string':
          case 'number':
          case 'boolean':
            if (fastPath) {
              if (oldValue !== value) {
                oldValue = value;
                childNodes[0].textContent = value;
              }
            } else {
              fastPath = true;
              oldValue = value;
              childNodes = domdiff(node.parentNode, childNodes, [text(node, value)], diffOptions);
            }

            break;

          case 'function':
            anyContent(value(node));
            break;

          case 'object':
          case 'undefined':
            if (value == null) {
              fastPath = false;
              childNodes = domdiff(node.parentNode, childNodes, [], diffOptions);
              break;
            }

          default:
            fastPath = false;
            oldValue = value;

            if (isArray(value)) {
              if (value.length === 0) {
                if (childNodes.length) {
                  childNodes = domdiff(node.parentNode, childNodes, [], diffOptions);
                }
              } else {
                switch (typeof(value[0])) {
                  case 'string':
                  case 'number':
                  case 'boolean':
                    anyContent(String(value));
                    break;

                  case 'function':
                    anyContent(value.map(invoke, node));
                    break;

                  case 'object':
                    if (isArray(value[0])) {
                      value = value.concat.apply([], value);
                    }

                  default:
                    childNodes = domdiff(node.parentNode, childNodes, value, diffOptions);
                    break;
                }
              }
            } else if (canDiff(value)) {
              childNodes = domdiff(node.parentNode, childNodes, value.nodeType === 11 ? slice.call(value.childNodes) : [value], diffOptions);
            } else if ('text' in value) {
              anyContent(String(value.text));
            } else if ('any' in value) {
              anyContent(value.any);
            } else if ('html' in value) {
              childNodes = domdiff(node.parentNode, childNodes, slice.call(createContent([].concat(value.html).join(''), nodeType).childNodes), diffOptions);
            } else if ('length' in value) {
              anyContent(slice.call(value));
            }

            break;
        }
      };

      return anyContent;
    },
    // style or textareas don't accept HTML as content
    // it's pointless to transform or analyze anything
    // different from text there but it's worth checking
    // for possible defined intents.
    text: function text(node) {
      var oldValue;

      var textContent = function textContent(value) {
        if (oldValue !== value) {
          oldValue = value;

          var type = typeof(value);

          if (type === 'object' && value) {
            if ('text' in value) {
              textContent(String(value.text));
            } else if ('any' in value) {
              textContent(value.any);
            } else if ('html' in value) {
              textContent([].concat(value.html).join(''));
            } else if ('length' in value) {
              textContent(slice.call(value).join(''));
            }
          } else if (type === 'function') {
            textContent(value(node));
          } else {
            node.textContent = value == null ? '' : value;
          }
        }
      };

      return textContent;
    }
  };

  function invoke(callback) {
    return callback(this);
  }

  var isNoOp = false;

  var _templateLiteral = function templateLiteral(tl) {
    var RAW = 'raw';

    var isBroken = function isBroken(UA) {
      return /(Firefox|Safari)\/(\d+)/.test(UA) && !/(Chrom[eium]+|Android)\/(\d+)/.test(UA);
    };

    var broken = isBroken((document.defaultView.navigator || {}).userAgent);
    var FTS = !(RAW in tl) || tl.propertyIsEnumerable(RAW) || !Object.isFrozen(tl[RAW]);

    if (broken || FTS) {
      var forever = {};

      var foreverCache = function foreverCache(tl) {
        for (var key = '.', i = 0; i < tl.length; i++) {
          key += tl[i].length + '.' + tl[i];
        }

        return forever[key] || (forever[key] = tl);
      }; // Fallback TypeScript shenanigans


      if (FTS) _templateLiteral = foreverCache; // try fast path for other browsers:
      // store the template as WeakMap key
      // and forever cache it only when it's not there.
      // this way performance is still optimal,
      // penalized only when there are GC issues
      else {
          var wm = new WeakMap$1();

          var set = function set(tl, unique) {
            wm.set(tl, unique);
            return unique;
          };

          _templateLiteral = function templateLiteral(tl) {
            return wm.get(tl) || set(tl, foreverCache(tl));
          };
        }
    } else {
      isNoOp = true;
    }

    return TL(tl);
  };

  function TL(tl) {
    return isNoOp ? tl : _templateLiteral(tl);
  }

  function tta (template) {
    var length = arguments.length;
    var args = [TL(template)];
    var i = 1;

    while (i < length) {
      args.push(arguments[i++]);
    }

    return args;
  }

  var wm = new WeakMap$1();
  var container = new WeakMap$1();
  var current = null;

  var lighterhtml = function lighterhtml(Tagger) {
    var html = outer('html', Tagger);
    var svg = outer('svg', Tagger);
    return {
      html: html,
      svg: svg,
      hook: function hook(useRef) {
        return {
          html: createHook(useRef, html),
          svg: createHook(useRef, svg)
        };
      },
      render: function render(node, callback) {
        var value = update.call(this, node, callback, Tagger);

        if (container.get(node) !== value) {
          container.set(node, value);
          appendClean(node, value);
        }

        return node;
      }
    };
  };

  var _lighterhtml = lighterhtml(Tagger),
      html$1 = _lighterhtml.html,
      svg = _lighterhtml.svg,
      render = _lighterhtml.render;

  function appendClean(node, fragment) {
    node.textContent = '';
    node.appendChild(fragment);
  }

  function asNode$1(result, forceFragment) {
    return result.nodeType === wireType ? result.valueOf(forceFragment) : result;
  }

  function createHook(useRef, view) {
    return function () {
      var ref = useRef(null);
      if (ref.current === null) ref.current = view["for"](ref);
      return asNode$1(ref.current.apply(null, arguments), false);
    };
  }

  function outer(type, Tagger) {
    var wm = new WeakMap$1();

    tag["for"] = function (identity, id) {
      var ref = wm.get(identity) || set(identity);
      if (id == null) id = '$';
      return ref[id] || create(ref, id);
    };

    return tag;

    function create(ref, id) {
      var args = [];
      var wire = null;
      var tagger = new Tagger(type);

      var callback = function callback() {
        return tagger.apply(null, unrollArray(args, 1, 1, Tagger));
      };

      return ref[id] = function () {
        args = tta.apply(null, arguments);
        var result = update(tagger, callback, Tagger);
        return wire || (wire = wiredContent(result));
      };
    }

    function set(identity) {
      var ref = {
        '$': null
      };
      wm.set(identity, ref);
      return ref;
    }

    function tag() {
      var args = tta.apply(null, arguments);
      return current ? new Hole(type, args) : new Tagger(type).apply(null, args);
    }
  }

  function set(node) {
    var info = {
      i: 0,
      length: 0,
      stack: [],
      update: false
    };
    wm.set(node, info);
    return info;
  }

  function update(reference, callback, Tagger) {
    var prev = current;
    current = wm.get(reference) || set(reference);
    current.i = 0;
    var ret = callback.call(this);
    var value;

    if (ret instanceof Hole) {
      value = asNode$1(unroll(ret, 0, Tagger), current.update);
      var _current = current,
          i = _current.i,
          length = _current.length,
          stack = _current.stack,
          _update = _current.update;
      if (i < length) stack.splice(current.length = i);
      if (_update) current.update = false;
    } else {
      value = asNode$1(ret, false);
    }

    current = prev;
    return value;
  }

  function unroll(hole, level, Tagger) {
    var _current2 = current,
        i = _current2.i,
        length = _current2.length,
        stack = _current2.stack;
    var type = hole.type,
        args = hole.args;
    var stacked = i < length;
    current.i++;
    if (!stacked) current.length = stack.push({
      l: level,
      kind: type,
      tag: null,
      tpl: args[0],
      wire: null
    });
    unrollArray(args, 1, level + 1, Tagger);
    var info = stack[i];

    if (stacked) {
      var control = info.l,
          kind = info.kind,
          _tag = info.tag,
          tpl = info.tpl,
          _wire = info.wire;

      if (control === level && type === kind && tpl === args[0]) {
        _tag.apply(null, args);

        return _wire;
      }
    }

    var tag = new Tagger(type);
    var wire = wiredContent(tag.apply(null, args));
    info.l = level;
    info.kind = type;
    info.tag = tag;
    info.tpl = args[0];
    info.wire = wire;
    if (i < 1) current.update = true;
    return wire;
  }

  function unrollArray(arr, i, level, Tagger) {
    for (var length = arr.length; i < length; i++) {
      var value = arr[i];

      if (typeof(value) === 'object' && value) {
        if (value instanceof Hole) {
          arr[i] = unroll(value, level - 1, Tagger);
        } else if (isArray(value)) {
          arr[i] = unrollArray(value, 0, level++, Tagger);
        }
      }
    }

    return arr;
  }

  function wiredContent(node) {
    var childNodes = node.childNodes;
    var length = childNodes.length;
    return length === 1 ? childNodes[0] : length ? new Wire(childNodes) : node;
  }

  function _templateObject2() {
    var data = _taggedTemplateLiteral(["<div class=\"", "\">", "</div>"]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = _taggedTemplateLiteral([""]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  // A set of useful utilities
  function mapClass(classes) {
    return classes.filter(function (e) {
      return typeof e === 'string' || e[1];
    }).map(function (e) {
      return typeof e === 'string' ? e : e[0];
    }).join(' ');
  }
  function ifdef(value, defaultValue) {
    return typeof value !== 'undefined' ? value : defaultValue;
  } // directives

  function vFor(items, cb) {
    return items.map(function (it, index) {
      return cb(it, index);
    });
  }
  function vLoop(items, cb) {
    return items.map(function (it, index) {
      var r = cb(it, index);
      return typeof r === 'function' && r._nameId && r._nameId === '_factory' ? r() : r;
    });
  }
  function vIf(cond, comp1, comp2) {
    if (cond) {
      return comp1;
    }

    if (comp2) {
      return comp2;
    }

    return html["for"]({})(_templateObject());
  }
  var animations = new WeakMap();
  function vAnimation(cond, comp, key, name) {
    var firstRender = animations.get(key);
    if (firstRender === undefined) firstRender = '';
    var className;
    var animationName = name || 'v-fade';
    var hide = cond ? '' : 'hide';
    animations.set(key, hide);

    if (firstRender === '') {
      className = "".concat(animationName, " ").concat(hide);
    } else {
      hide = cond ? 'show' : 'hide';
      className = "".concat(animationName, " ").concat(hide);
    }

    return html["for"](key)(_templateObject2(), className, comp);
  }

  function _templateObject$1() {
    var data = _taggedTemplateLiteral([""]);

    _templateObject$1 = function _templateObject() {
      return data;
    };

    return data;
  }

  var includes = Array.prototype.includes; // VirtualElement component cache

  var components = new Map();

  function tearDown(mutations) {
    mutations.forEach(function (mutation) {
      components.forEach(function (comp) {
        if (comp.hydrated) {
          // do not remove hydrated components
          return;
        }

        if (includes.call(mutation.removedNodes, comp.node) || !document.body.contains(comp.node)) {
          comp.onDisconnected();
          var _key = comp.key;
          components["delete"](_key);
        }
      });
    });
  }

  var observer = new MutationObserver(tearDown);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false
  });

  function attachProperty(prototype, property, options) {
    var type = options.type;

    function get() {
      var v = prototype.__values__[property];

      if (typeof v === 'function') {
        return v();
      }

      return v;
    }

    function set(val) {
      var value;

      if (val === null || val === undefined || typeof val === 'function') {
        value = val;
      } else {
        value = type(val);
      }

      prototype._setPropertyValue(property, value);
    }

    Object.defineProperty(prototype, property, options.computed ? {
      get: get
    } : {
      get: get,
      set: set
    });
  }

  var id$ = 0;

  function uid() {
    id$ += 1;
    return id$;
  }

  function wiredContent$1(node) {
    // eslint-disable-next-line prefer-destructuring
    var childNodes = node.childNodes; // eslint-disable-next-line prefer-destructuring

    var length = childNodes.length; // eslint-disable-next-line no-nested-ternary

    return length === 1 ? childNodes[0] : length ? new Wire(childNodes) : node;
  }

  function Component(Class, args, parent, id) {
    var nextId = uid();
    var _key = {
      id: nextId
    };

    function _create() {
      var comp = new Class(args);
      comp.key = _key;
      comp.id = id;
      components.set(_key, comp);
      comp.__parent__ = parent;

      if (parent && parent.stylesRegistry) {
        if (id && parent.stylesRegistry[id]) {
          comp.styles = _objectSpread2({}, comp.styles, {}, parent.stylesRegistry[id]);
        } else {
          var clsName = Class.className || false;

          if (clsName && parent.stylesRegistry[clsName]) {
            comp.styles = _objectSpread2({}, comp.styles, {}, parent.stylesRegistry[clsName]);
          }
        }
      }

      return comp;
    }

    function _factory(props) {
      var comp = components.get(_key) || _create();

      if (props) {
        comp._setProps(props);
      }

      return comp._updater;
    }

    _factory._nameId = '_factory';

    _factory.instance = function () {
      return components.get(_key) || _create();
    };

    return _factory;
  } // Lightweight jsx fragments (v2 rendering only)


  var Fragment =
  /*#__PURE__*/
  function () {
    _createClass(Fragment, null, [{
      key: "for",
      // simplified version of Component.for factory
      // see https://github.com/WebReflection/hyperHTML/blob/master/esm/classes/Component.js
      // all credits goes to their original author
      value: function _for(parent, id, props) {
        var _props = props === undefined ? {} : props;

        if (typeof parent.__childs__ === 'undefined') {
          parent.__childs__ = {};
        }

        if (parent.__childs__[id]) {
          return parent.__childs__[id](props);
        }

        parent.__childs__[id] = Component(this, _props, parent, id);
        return parent.__childs__[id];
      }
    }]);

    function Fragment(props) {
      _classCallCheck(this, Fragment);

      // this DOM node
      this._node = null; // parent element

      this.__parent__ = null; // nested childs

      this.__childs__ = {}; // partial render keys

      this.__partKeys__ = {};
      this.props = props;
      this.render = this.render.bind(this);
      this._updater = this._updater.bind(this);
    }

    _createClass(Fragment, [{
      key: "part",
      value: function part(partId) {
        var partKey = this.__partKeys__[partId] || (this.__partKeys__[partId] = {
          tagger: new Tagger('html'),
          wire: null
        });
        return function () {
          // eslint-disable-next-line prefer-spread, prefer-rest-params
          var result = partKey.tagger.apply(null, arguments); // eslint-disable-next-line no-return-assign

          return partKey.wire || (partKey.wire = wiredContent$1(result));
        };
      }
    }, {
      key: "onDisconnected",
      value: function onDisconnected() {
        // fix possible memory leak with container components displaying multiple list items
        if (this.__parent__ && this.__parent__.__childs__) {
          delete this.__parent__.__childs__[this.id];
        }
      }
    }, {
      key: "_setProps",
      value: function _setProps(props) {
        this.props = props;
      }
    }, {
      key: "_updater",
      value: function _updater() {
        var template = this.render(this.props);
        var wire = this._node || (this._node = template);
        return wire;
      }
    }, {
      key: "render",
      value: function render(props) {
        return '';
      }
    }, {
      key: "node",
      get: function get() {
        return this._node;
      }
    }]);

    return Fragment;
  }();

  var VirtualElement =
  /*#__PURE__*/
  function () {
    _createClass(VirtualElement, null, [{
      key: "for",
      // simplified version of Component.for factory
      // see https://github.com/WebReflection/hyperHTML/blob/master/esm/classes/Component.js
      // all credits goes to their original author
      value: function _for(parent, id, props) {
        var _id = id === undefined ? 'default' : id;

        var _props = props === undefined ? {} : props;

        if (typeof parent.__childs__ === 'undefined') {
          parent.__childs__ = {};
        }

        if (parent.__childs__[_id]) {
          return parent.__childs__[_id](props);
        }

        parent.__childs__[_id] = Component(this, _props, parent, _id);
        return parent.__childs__[_id];
      }
    }, {
      key: "properties",
      get: function get() {
        return {};
      }
    }]);

    function VirtualElement() {
      var _this = this;

      _classCallCheck(this, VirtualElement);

      // html renderer internals
      // set hydrated=true for bypass first render and use content provided by SSR
      this.hydrated = false; // setting v2 to true will switch to version 2 rendering style

      this.v2 = false;
      this.$ = new Tagger('html');

      this._html = function () {
        return this.$.apply(null, arguments);
      }; // element identity (for wired nodes)


      this._key = null; // element id (inside parent)

      this._id = null; // element node (every element template should contain only one root node)

      this._node = null; // parent element

      this.__parent__ = null; // this element childs

      this.__childs__ = {};
      this._needsRender = true;
      this._connected = false;
      this.__values__ = {}; // partial render keys

      this.__partKeys__ = {}; // property watchers

      this.watched = {}; // styles registry

      this.stylesRegistry = {};
      this.styles = {};
      var props = this.constructor.properties;

      if (props) {
        Object.keys(props).forEach(function (name) {
          var prop = props[name];
          attachProperty(_this, name, prop);

          if (typeof prop["default"] !== 'undefined') {
            _this.__values__[name] = prop["default"];
          }
        });
      }

      this.render = this.render.bind(this);
      this._updater = this._updater.bind(this);
    }

    _createClass(VirtualElement, [{
      key: "part",
      value: function part(partId) {
        var partKey = this.__partKeys__[partId] || (this.__partKeys__[partId] = {
          tagger: new Tagger('html'),
          wire: null
        });
        return function () {
          // eslint-disable-next-line prefer-spread, prefer-rest-params
          var result = partKey.tagger.apply(null, arguments); // eslint-disable-next-line no-return-assign

          return partKey.wire || (partKey.wire = wiredContent$1(result));
        };
      }
    }, {
      key: "_setPropertyValue",
      value: function _setPropertyValue(property, value) {
        var oldVal = this.__values__[property];
        this.__values__[property] = value;

        if (oldVal !== value || typeof(value) === 'object') {
          if (this.watched[property] && this.watched[property](value, oldValue)) {
            return;
          }

          if (!this._needsRender) this.invalidate();
        }
      }
    }, {
      key: "_setProps",
      value: function _setProps(props) {
        var _this2 = this;

        if (props) {
          if (this.onUpdated(props)) {
            return;
          }

          Object.keys(props).forEach(function (key) {
            _this2._setPropertyValue(key, props[key]);
          });
        } // this.invalidate();

      }
    }, {
      key: "onConnected",
      value: function onConnected() {}
    }, {
      key: "onDisconnected",
      value: function onDisconnected() {
        // fix possible memory leak with container components displaying multiple list items
        if (this.__parent__ && this.__parent__.__childs__) {
          delete this.__parent__.__childs__[this.id];
        }

        this._connected = false;
      }
    }, {
      key: "onRender",
      value: function onRender() {}
    }, {
      key: "invalidate",
      value: function invalidate() {
        var _this3 = this;

        if (!this._needsRender) {
          this._needsRender = true;

          if (this.hydrated) {
            Promise.resolve().then(function () {
              return _this3.deHydrate();
            });
            return;
          }

          Promise.resolve().then(function () {
            if (_this3._needsRender) _this3.update();
          });
        }
      } // eslint-disable-next-line no-unused-vars

    }, {
      key: "onUpdated",
      value: function onUpdated(changedProps) {}
    }, {
      key: "update",
      value: function update() {
        if (this._connected) {
          return this._updater();
        }

        return '';
      } // ugly, yet working solution to continue normal work after first render

    }, {
      key: "deHydrate",
      value: function deHydrate() {
        this._node = null;
        this.hydrated = false;

        this.__parent__.invalidate();
      }
    }, {
      key: "_updater",
      value: function _updater() {
        var _this4 = this;

        var template = this.hydrated ? this._node : this.render();
        var wire = this._node || (this._node = this.v2 ? template : wiredContent$1(template));
        this.onRender();

        if (!this._connected) {
          this._connected = true;
          setTimeout(function () {
            return _this4.onConnected();
          });
        }

        this._needsRender = false;
        return wire;
      }
    }, {
      key: "render",
      value: function render() {
        return this.html(_templateObject$1());
      } // data modeling

    }, {
      key: "vModel",
      value: function vModel(attr) {
        var self = this;

        function x() {
          return self.__values__[attr];
        }

        x.model = function () {
          return attr;
        };

        return x;
      } // Events

    }, {
      key: "$emit",
      value: function $emit(event, payload) {
        if (this.__parent__) {
          var _event$split = event.split(':'),
              _event$split2 = _slicedToArray(_event$split, 2),
              type = _event$split2[0],
              modifier = _event$split2[1];

          switch (type) {
            case 'update':
              {
                if (this.__values__[modifier].model) {
                  var attr = this.__values__[modifier].model();

                  this.__parent__._setPropertyValue(attr, payload);
                } else {
                  this.__values__[modifier] = payload;
                }

                this.invalidate();
                break;
              }

            default:
              {
                if (this.__parent__.handleEvent) {
                  this.__parent__.handleEvent(event, payload);
                }
              }
          }
        } else {
          console.log('NO PARENT');
        }
      }
    }, {
      key: "html",
      get: function get() {
        return this._html;
      }
    }, {
      key: "key",
      set: function set(value) {
        this._key = value;
      },
      get: function get() {
        return this._key;
      }
    }, {
      key: "node",
      get: function get() {
        return this._node;
      }
    }, {
      key: "id",
      set: function set(value) {
        this._id = value;
      },
      get: function get() {
        return this._id;
      }
    }]);

    return VirtualElement;
  }();

  exports.Component = Component;
  exports.Fragment = Fragment;
  exports.VirtualElement = VirtualElement;
  exports.html = html$1;
  exports.ifdef = ifdef;
  exports.mapClass = mapClass;
  exports.render = render;
  exports.svg = svg;
  exports.vAnimation = vAnimation;
  exports.vFor = vFor;
  exports.vIf = vIf;
  exports.vLoop = vLoop;

  return exports;

}(document,{}));
