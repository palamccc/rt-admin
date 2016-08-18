
/* eslint-disable no-param-reassign */
export default function autoBind(comp) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(comp))
    .filter(prop => /^on[A-Z]/.test(prop) && typeof comp[prop] === 'function')
    .forEach(method => { comp[method] = comp[method].bind(comp); });
}
/* eslint-enable */
