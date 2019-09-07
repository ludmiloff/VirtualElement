
// A set of useful utilities

export function mapClass(classes) {
  return classes.filter(e => typeof e === 'string' || e[1]).map(e => (typeof e === 'string' ? e : e[0])).join(' ');
}

export function ifdef(value, defaultValue) {
  return typeof value !== 'undefined' ? value : defaultValue;
}

// directives

export function vFor(items, cb) {
  return items.map((it, index) => cb(it, index));
}

export function vLoop(items, cb) {
  return items.map((it, index) => {
    const r = cb(it, index);
    return (typeof r === 'function' && r._nameId && r._nameId === '_factory') ? r() : r;
  });
}

export function vIf(cond, comp1, comp2) {
  if (cond) {
    return comp1;
  }
  if (comp2) {
    return comp2;
  }
  return html.for({})``;
}

const animations = new WeakMap();

export function vAnimation(cond, comp, key, name) {

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