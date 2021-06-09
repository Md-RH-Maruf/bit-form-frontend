export function observeElement(element, property, callback, delay = 0) {
  const elementPrototype = Object.getPrototypeOf(element)
  if (Object.prototype.hasOwnProperty.call(elementPrototype, property)) {
    const descriptor = Object.getOwnPropertyDescriptor(
      elementPrototype,
      property,
    )
    Object.defineProperty(element, property, {
      get(...args) {
        return descriptor.get.apply(this, args)
      },
      set(...args) {
        const oldValue = this[property]
        descriptor.set.apply(this, args)
        const newValue = this[property]
        if (typeof callback == 'function') {
          setTimeout(callback.bind(this, oldValue, newValue), delay)
        }
        return newValue
      },
    })
  }
}

export const loadScript = (src, type) => new Promise((resolve) => {
  const script = document.createElement('script')
  script.src = src
  script.onload = () => {
    resolve(true)
  }
  script.onerror = () => {
    resolve(false)
  }
  script.id = type
  document.body.appendChild(script)
})

export const select = (selector) => document.querySelector(selector)
