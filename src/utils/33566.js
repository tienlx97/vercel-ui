export function chain(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      callback?.(...args)
    }
  }
}
