/* eslint-disable no-param-reassign */
import produce from 'immer'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import { select } from '../../Utils/globalHelpers'

// eslint-disable-next-line import/prefer-default-export
export const showDraggableModal = (e, setDraggableModal, { component, width = 250, subtitle, action, value, objectPaths, id }) => {
  const settingsMenu = select('#settings-menu')
  const offset = { top: 55 }
  const x = Math.round((window.innerWidth - settingsMenu.getBoundingClientRect().width) - width)
  const y = e.target.getBoundingClientRect().top - offset.top
  setDraggableModal({ show: true, component, position: { x, y }, width, subtitle, action, value, objectPaths, id })
}

export const json2CssStr = (className, jsonValue) => {
  let cssStr = '{'
  const objArr = Object.entries(jsonValue)
  objArr.map(([property, value]) => {
    cssStr += `${property}:${value};`
  })
  cssStr += '}'
  return className + cssStr
}

export const changeFormDir = (style, dir) => produce(style, drft => {
  if (drft.theme === 'bitformDefault') {
    const fieldsKeysArr = Object.keys(drft.fields)
    const fieldsKeysArrLen = fieldsKeysArr.length
    for (let i = 0; i < fieldsKeysArrLen; i += 1) {
      const fieldKey = fieldsKeysArr[i]
      if (Object.hasOwnProperty.call(drft.fields, fieldKey)) {
        if (drft.fields[fieldKey].overrideGlobalTheme === false) {
          switch (drft.fields[fieldKey].fieldType) {
            case 'check':
            case 'radio':
              if (dir === 'rtl') {
                const prvMargin = drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-right']
                drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-left'] = prvMargin
                delete drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-right']
              } else if (dir === 'ltr') {
                const prvMargin = drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-left']
                drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-right'] = prvMargin
                delete drft.fields[fieldKey].classes[`.${fieldKey}-bx`]['margin-left']
              }
              break
            default:
              break
          }
        }
      }
    }
  }
})

export const unitConverterHelper = (unit, value, preUnit) => {
  if (preUnit === unit) return value

  if (preUnit === 'px' && unit === 'em') return Number((value * 0.0625).toFixed(3))
  if (preUnit === 'px' && unit === 'rem') return Number((value * 0.0625).toFixed(3))
  if (preUnit === 'px' && unit === '%') return Number(value * 6.25)

  if (preUnit === 'em' && unit === 'px') return Number(value * 16)
  if (preUnit === 'em' && unit === 'rem') return Number(value)
  if (preUnit === 'em' && unit === '%') return Number(value * 100)

  if (preUnit === 'rem' && unit === 'em') return Number(value)
  if (preUnit === 'rem' && unit === 'px') return Number(value * 16)
  if (preUnit === 'rem' && unit === '%') return Number(value * 100)

  if (preUnit === '%' && unit === 'px') return Number(value * 0.16)
  if (preUnit === '%' && unit === 'rem') return Number(value * 0.01)
  if (preUnit === '%' && unit === 'em') return Number(value * 0.01)
}

export const getNumFromStr = (str = '') => str.match(/[-]?([0-9]*[.])?[0-9]+/gi)?.[0]
export const getStrFromStr = (str = '') => str.match(/([A-z]|%)+/gi)?.[0]

export const searchKey = (e) => {
  if (e.code === 'Slash') {
    document.getElementById('search-icon').focus()
  }
  if (e.code === 'Escape') {
    document.getElementById('search-icon').blur()
  }
}

function getAbsoluteSize(el) {
  const styles = window.getComputedStyle(el)
  // const marginTop =
  // const marginBottom =

  // const marginLeft = parseFloat(styles.marginLeft)
  // const marginRight = parseFloat(styles.marginRight)

  // const borderTop = parseFloat(styles.borderTop)
  const borderBottom = parseFloat(styles.borderBottom)

  const borderLeft = parseFloat(styles.borderLeft)
  const borderRight = parseFloat(styles.borderRight)

  const paddingLeft = parseFloat(styles.paddingLeft)
  const paddingRight = parseFloat(styles.paddingRight)
  const paddingTop = parseFloat(styles.paddingTop)
  const paddingBottom = parseFloat(styles.paddingBottom)

  return {
    borderBottom,
    borderTop: parseFloat(styles.borderTop),
    borderLeft,
    borderRight,
    marginBottom: parseFloat(styles.marginBottom),
    marginTop: parseFloat(styles.marginTop),
    marginLeft: parseFloat(styles.marginLeft),
    marginRight: parseFloat(styles.marginRight),
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  }
}

/**
 * @param {string} selector html query selector
 * @param {string} selectType "element" | "margin" | "padding"
*/
export function highlightElm(selector, selectType = 'element padding margin') {
  const elms = document.getElementById('bit-grid-layout')?.contentWindow.document.querySelectorAll(selector)
  elms?.forEach(elm => {
    const marginDiv = document.createElement('div')
    const paddingDiv = document.createElement('div')
    const elementDiv = document.createElement('div')
    const { marginRight,
      marginBottom,
      marginLeft,
      marginTop,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom } = getAbsoluteSize(elm)
    const { top, left, height, width } = elm.getBoundingClientRect()

    marginDiv.style.width = `${width + marginRight + marginLeft}px`
    marginDiv.style.height = `${height + marginTop + marginBottom}px`
    marginDiv.style.top = `${top - marginTop}px`
    marginDiv.style.left = `${left - marginLeft}px`
    marginDiv.classList.add('highlight-margin')
    marginDiv.setAttribute('data-highlight', selector)
    marginDiv.onclick = (e) => {
      if (e.target.hasAttribute('data-highlight')) { e.target.remove(); return }
      if (e.target.parentNode.hasAttribute('data-highlight')) { e.target.parentNode.remove(); return }
      if (e.target.parentNode.parentNode.hasAttribute('data-highlight')) { e.target.parentNode.parentNode.remove() }
    }

    elementDiv.classList.add('highlight-element')
    elementDiv.style.width = `${width}px`
    elementDiv.style.height = `${height}px`
    elementDiv.style.marginRight = `${marginRight}px`
    elementDiv.style.marginLeft = `${marginLeft}px`
    elementDiv.style.marginTop = `${marginTop}px`
    elementDiv.style.marginBottom = `${marginBottom}px`

    paddingDiv.classList.add('highlight-padding')
    paddingDiv.style.width = `${width - paddingLeft - paddingRight}px`
    paddingDiv.style.height = `${height - paddingTop - paddingBottom}px`
    paddingDiv.style.marginRight = `${paddingRight}px`
    paddingDiv.style.marginLeft = `${paddingLeft}px`
    paddingDiv.style.marginTop = `${paddingTop}px`
    paddingDiv.style.marginBottom = `${paddingBottom}px`

    if (selectType.indexOf('element') < 0) {
      elementDiv.style.background = 'transparent'
    }
    if (selectType.indexOf('margin') < 0
      || (width + marginTop + marginBottom) === width
      || (height + marginRight + marginLeft) === height) {
      marginDiv.style.background = 'transparent'
    }
    if (selectType.indexOf('padding') < 0
      || (width - paddingLeft - paddingRight) === width
      || (height - paddingTop - paddingBottom) === height) {
      paddingDiv.style.background = 'transparent'
    }

    marginDiv.appendChild(elementDiv)
    elementDiv.appendChild(paddingDiv)
    // console.log('', marginDiv)
    // document.body.appendChild(marginDiv)
    document.getElementById('bit-grid-layout')?.contentWindow?.document.body.prepend(marginDiv)
  })
}

export const removeHightlight = (selector = '[data-highlight]') => {
  const elms = document.getElementById('bit-grid-layout')?.contentWindow.document.querySelectorAll(selector)
  elms.forEach(elm => { elm.remove() })
}

/**
 * @param {string} fk field key
 * @param {string} type size
*/
export const CommonStyle = (fk, type) => {
  switch (type) {
    case 'small-2':
      return {
        [`.${fk}-lbl`]: { 'font-size': '10px' },
        [`.${fk}-st`]: { 'font-size': '9px' },
        [`.${fk}-ht`]: { 'font-size': '9px' },
        [`.${fk}-fld`]: { 'font-size': '10px', padding: '5px 2px !important' },
      }
    case 'small-1':
      return {
        [`.${fk}-lbl`]: { 'font-size': '12px' },
        [`.${fk}-st`]: { 'font-size': '10px' },
        [`.${fk}-ht`]: { 'font-size': '10px' },
        [`.${fk}-fld`]: { 'font-size': '12px', padding: '6px 3px' },
      }
    case 'small':
      return {
        [`.${fk}-lbl`]: { 'font-size': '14px' },
        [`.${fk}-st`]: { 'font-size': '12px' },
        [`.${fk}-ht`]: { 'font-size': '12px' },
        [`.${fk}-fld`]: { 'font-size': '14px', padding: '7px 4px' },
      }
    case 'medium':
      return {
        [`.${fk}-lbl`]: { 'font-size': '16px' },
        [`.${fk}-st`]: { 'font-size': '11px' },
        [`.${fk}-ht`]: { 'font-size': '11px' },
        [`.${fk}-fld`]: { 'font-size': '16px', padding: '8px 5px' },
      }
    case 'large':
      return {
        [`.${fk}-lbl`]: { 'font-size': '18px' },
        [`.${fk}-st`]: { 'font-size': '12px' },
        [`.${fk}-ht`]: { 'font-size': '12px' },
        [`.${fk}-fld`]: { 'font-size': '18px', padding: '9px 6px' },
      }
    case 'large-1':
      return {
        [`.${fk}-lbl`]: { 'font-size': '20px' },
        [`.${fk}-st`]: { 'font-size': '14px' },
        [`.${fk}-ht`]: { 'font-size': '14px' },
        [`.${fk}-fld`]: { 'font-size': '20px', padding: '10px 7px' },
      }
    default:
      return 'default......'
  }
}

export const splitValueBySpaces = str => str?.split(/(?!\(.*)\s(?![^(]*?\))/g) || []

export const getStyleStateObj = (obj, states) => states[obj]

export const getStyleValueFromObjectPath = (state, path) => {
  const paths = path?.split('->') || []
  let value = state
  for (let i = 0; i < paths.length; i += 1) {
    value = value[paths[i]]
  }

  return value
}

export const setStyleStateObj = (obj, path, value, setStates) => {
  let setStateFunc = null
  if (obj === 'themeVars') {
    setStateFunc = setStates.setThemeVars
  } else if (obj === 'styles') {
    setStateFunc = setStates.setStyles
  }
  setStateFunc?.(preStyle => produce(preStyle, drftStyle => {
    assignNestedObj(drftStyle, path, value)
  }))
}

export const getThemeColor = (colorScheme, colorVar, darkThemeColors, lightThemeColors, highContrastThemeColors) => {
  if (colorScheme === 'dark') return darkThemeColors[colorVar]
  if (colorScheme === 'light') return lightThemeColors[colorVar]
  if (colorScheme === 'high-contrast') return highContrastThemeColors[colorVar]
}
