import { getRecoil } from 'recoil-nexus'
import { $fields } from '../GlobalStates/GlobalStates'

export function observeElement(element, property, callback, delay = 0) {
  const elementPrototype = Object.getPrototypeOf(element)
  if (Object.prototype.hasOwnProperty.call(elementPrototype, property)) {
    const descriptor = Object.getOwnPropertyDescriptor(
      elementPrototype,
      property,
    )
    Object.defineProperty(element, property, {
      configurable: true,
      get(...args) {
        return descriptor.get.apply(this, args)
      },
      set(...args) {
        const oldValue = this[property]
        descriptor.set.apply(this, args)
        const newValue = this[property]
        if (typeof callback === 'function') {
          setTimeout(callback.bind(this, oldValue, newValue), delay)
        }
        return newValue
      },
    })
  }
}

export const loadScript = ({ src, integrity, id, scriptInGrid = false, attr, callback = null }) => new Promise((resolve) => {
  const script = document.createElement('script')
  script.src = src
  if (integrity) {
    script.integrity = integrity
    script.crossOrigin = 'anonymous'
  }
  script.id = id
  if (attr) {
    Object.entries(attr).forEach(([key, val]) => {
      script.setAttribute(key, val)
    })
  }
  script.onload = () => {
    resolve(true)
    if (callback) callback()
  }
  script.onerror = () => {
    resolve(false)
  }

  removeScript(id, scriptInGrid)

  let bodyElm = document.body

  if (scriptInGrid) {
    bodyElm = document.getElementById('bit-grid-layout')?.contentWindow?.document.body
  }

  bodyElm.appendChild(script)
})

export const removeScript = (id, scriptInGrid = false) => {
  let bodyElm = document.body

  if (scriptInGrid) {
    bodyElm = document.getElementById('bit-grid-layout')?.contentWindow?.document.body
  }

  const alreadyExistScriptElm = bodyElm ? bodyElm.querySelector(`#${id}`) : null

  if (alreadyExistScriptElm) {
    bodyElm.removeChild(alreadyExistScriptElm)
  }
}

export const select = (selector) => document.querySelector(selector)
export const selectInGrid = (selector) => document.getElementById('bit-grid-layout')?.contentWindow?.document.querySelector(selector)
export const selectAllInGrid = (selector) => document.getElementById('bit-grid-layout')?.contentWindow?.document.querySelectorAll(selector)

export function escapeHTMLEntity(string) {
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }

  const reUnescapedHtml = /[&<>"']/g
  const reHasUnescapedHtml = RegExp(reUnescapedHtml.source)

  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, (chr) => htmlEscapes[chr])
    : (string || '')
}

export function unescapeHTMLEntity(string) {
  const htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  }

  const reEscapedHtml = /&(?:amp|lt|gt|quot|#(0+)?39);/g
  const reHasEscapedHtml = RegExp(reEscapedHtml.source)

  return (string && reHasEscapedHtml.test(string))
    ? string.replace(reEscapedHtml, (entity) => (htmlUnescapes[entity] || "'"))
    : (string || '')
}

export const getCustomClsName = (fk, element) => {
  const fields = getRecoil($fields)
  return fields[fk]?.customClasses?.[element] ?? ''
}

export const getCustomAttributs = (fk, element) => {
  const fields = getRecoil($fields)
  const attr = fields[fk]?.customAttributes?.[element]
  if (!attr) return
  const obj = {}
  if (attr) {
    const attrLen = attr.length
    let i = 0
    while (i < attrLen) {
      if (attr[i].key && attr[i].value) {
        obj[attr[i].key] = attr[i].value
      }
      i += 1
    }
  }
  return obj
}
export const getDataDavAttrArr = (fk, element) => {
  const fields = getRecoil($fields)
  const attr = fields[fk]?.customAttributes?.[element]
  const dataDevObj = { [`data-dev-${element}`]: fk }
  if (!([element] in fields[fk].customAttributes)) return dataDevObj
  if (attr) {
    const attrLen = attr.length
    let i = 0
    while (i < attrLen) {
      if (attr[i].key && attr[i].value) {
        dataDevObj[[attr[i].key]] = attr[i].value
      }
      i += 1
    }
  }
  return dataDevObj
}
