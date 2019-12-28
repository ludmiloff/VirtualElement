
// A set of useful utilities

export function mapClass(classes) {
  return classes.filter(e => typeof e === 'string' || e[1]).map(e => (typeof e === 'string' ? e : e[0])).join(' ');
}


// directives

export function vLoop(items, cb) {
  return items.map((it, index) => {
    const r = cb(it, index);
    return (typeof r === 'function' && r._nameId && r._nameId === '_factory') ? r() : r;
  });
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