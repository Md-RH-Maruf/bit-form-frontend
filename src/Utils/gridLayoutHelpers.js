import produce from 'immer'
import { getRecoil, setRecoil } from 'recoil-nexus'
import {
  $breakpoint,
  $contextMenu,
  $fields, $formId, $layouts, $nestedLayouts, $proModal, $resizingFld, $uniqueFieldId,
} from '../GlobalStates/GlobalStates'
import { $staticStylesState } from '../GlobalStates/StaticStylesState'
import { $styles } from '../GlobalStates/StylesState'
import { $themeVars } from '../GlobalStates/ThemeVarsState'
import noStyleTheme from '../components/style-new/themes/0_noStyle'
import bitformDefaultTheme from '../components/style-new/themes/1_bitformDefault'
import { updateFieldStyleByFieldSizing } from '../components/style-new/themes/1_bitformDefault/fieldSizeControlStyle'
import atlassianTheme from '../components/style-new/themes/2_atlassian'
import {
  addNewItemInLayout, addToBuilderHistory, checkFieldsExtraAttr, getAbsoluteElmHeight, getLatestState, getResizableHandles, reCalculateFldHeights,
} from './FormBuilderHelper'
import { IS_PRO, deepCopy } from './Helpers'
import proHelperData from './StaticData/proHelperData'
import { selectInGrid } from './globalHelpers'

const handleFieldExtraAttr = (fieldData) => {
  const extraAttr = checkFieldsExtraAttr(fieldData, payments, reCaptchaV2)
  if (extraAttr.validType === 'pro') {
    setProModal({ show: true, ...proHelperData[fieldData.typ] })
    return 0
  }

  if (extraAttr.validType === 'onlyOne') {
    setAlertMdl({ show: true, msg: extraAttr.msg, cancelBtn: false })
    return 0
  }

  if (extraAttr.validType === 'keyEmpty') {
    setAlertMdl({ show: true, msg: extraAttr.msg, cancelBtn: false })
    return 0
  }

  if (extraAttr.validType === 'setDefaultPayConfig') {
    const newFldData = { ...fieldData }
    newFldData.payIntegID = extraAttr.payData.id
    return newFldData
  }

  return fieldData
}

const setUpdateErrorMsgByDefault = (fldKey, fieldData) => {
  const { typ: fldType } = fieldData

  if (fldType === 'paypal') {
    addFormUpdateError({
      fieldKey: fldKey,
      errorKey: 'paypalClientIdMissing',
      errorMsg: 'PayPal Client ID is missing',
      errorUrl: `field-settings/${fldKey}`,
    })
    addFormUpdateError({
      fieldKey: fldKey,
      errorKey: 'paypalAmountMissing',
      errorMsg: __('PayPal Fixed Amount is not valid'),
      errorUrl: `field-settings/${fldKey}`,
    })
  } else if (fldType === 'razorpay') {
    addFormUpdateError({
      fieldKey: fldKey,
      errorKey: 'razorpayClientIdMissing',
      errorMsg: __('Razorpay Client ID is missing'),
      errorUrl: `field-settings/${fldKey}`,
    })
    addFormUpdateError({
      fieldKey: fldKey,
      errorKey: 'razorpayAmountMissing',
      errorMsg: __('Razorpay Fixed Amount is not valid'),
      errorUrl: `field-settings/${fldKey}`,
    })
  }
}

export const generateFieldLblForHistory = fldData => {
  if (fldData.typ === 'button') return fldData.txt
  if (fldData.typ === 'decision-box') return 'Decision Box'
  if (fldData.typ === 'title') return 'Title Field'
  if (fldData.typ === 'html') return 'HTML Field'
  if (fldData.typ === 'recaptcha') return 'Recaptcha Field'
  if (!fldData.lbl) return fldData.typ.charAt(0).toUpperCase() + fldData.typ.slice(1)
  return fldData.lbl
}

export function addNewFieldToGridLayout(layouts, fieldData, fieldSize, addPosition) {
  const formID = getRecoil($formId)
  const uniqueFieldId = getRecoil($uniqueFieldId)
  const fields = getRecoil($fields)
  console.log('on add ', fields)
  const styles = getRecoil($styles)
  const themeVars = getRecoil($themeVars)
  const staticStylesState = getRecoil($staticStylesState)

  // let processedFieldData = handleFieldExtraAttr(fieldData)
  let processedFieldData = fieldData
  if (!processedFieldData) return
  processedFieldData = { ...processedFieldData, fieldName: `${processedFieldData.typ}-${formID}-${uniqueFieldId}` }
  const newBlk = `b${formID}-${uniqueFieldId}`
  setUpdateErrorMsgByDefault(newBlk, processedFieldData)
  // eslint-disable-next-line prefer-const
  let { x, y } = addPosition
  if (y !== 0) { y -= 1 }
  const { w, h, minH, maxH, minW } = fieldSize
  const newLayoutItem = {
    i: newBlk, x, y, w, h, minH, maxH, minW,
  }
  const resizeHandles = getResizableHandles(fieldData.typ)
  if (resizeHandles) {
    newLayoutItem.resizeHandles = resizeHandles
  }
  const newLayouts = addNewItemInLayout(layouts, newLayoutItem)
  const newFields = { ...fields, [newBlk]: processedFieldData }

  setRecoil($fields, newFields)
  console.log('after add', newFields)
  sessionStorage.setItem('btcd-lc', '-')

  // add to history
  const event = `${generateFieldLblForHistory(fieldData)} added`
  const type = 'add_fld'

  setTimeout(() => {
    selectInGrid(`[data-key="${newBlk}"]`)?.focus()
  }, 500)
  const fldType = processedFieldData.typ

  if (fldType === 'section') {
    const nestedLayouts = getRecoil($nestedLayouts)
    setRecoil($nestedLayouts, produce(nestedLayouts, draftNestedLayouts => {
      draftNestedLayouts[newBlk] = { lg: [], md: [], sm: [] }
    }))
  }

  // add style
  const tempThemeVars = deepCopy(themeVars)
  const newStyles = produce(styles, draftStyle => {
    const globalTheme = draftStyle.theme

    if (globalTheme === 'bitformDefault') {
      const defaultFieldStyle = bitformDefaultTheme({
        type: processedFieldData.typ,
        fieldKey: newBlk,
        direction: themeVars['--dir'],
      })
      if (draftStyle.fieldsSize !== 'medium') {
        const updateStyle = updateFieldStyleByFieldSizing(defaultFieldStyle, newBlk, processedFieldData.typ, prevStyles.fieldsSize, tempThemeVars)
        draftStyle.fields[newBlk] = updateStyle
      } else {
        draftStyle.fields[newBlk] = defaultFieldStyle
      }
    }

    if (globalTheme === 'atlassian') {
      draftStyle.fields[newBlk] = atlassianTheme({
        type: processedFieldData.typ,
        fieldKey: newBlk,
        direction: themeVars['--dir'],
      })
    }

    if (globalTheme === 'noStyle') {
      draftStyle.fields[newBlk] = noStyleTheme({
        type: processedFieldData.typ,
        fieldKey: newBlk,
        direction: themeVars['--dir'],
      })
    }
  })
  setRecoil($styles, newStyles)
  setRecoil($themeVars, tempThemeVars)

  if (fldType === 'razorpay' || fldType === 'paypal') {
    setRecoil($staticStylesState, produce(staticStylesState, draftStaticStyleState => {
      draftStaticStyleState.staticStyles['.pos-rel'] = { position: 'relative' }
      draftStaticStyleState.staticStyles['.form-loading::before'] = {
        position: 'absolute',
        'border-radius': '5px',
        display: 'block',
        top: 0,
        left: 0,
        content: "''",
        height: '100%',
        width: '100%',
        'z-index': '9999',
        'background-color': 'rgba(0,0,0,0.2)',
      }
      draftStaticStyleState.staticStyles['.form-loading::after'] = {
        position: 'absolute',
        'border-radius': '5px',
        color: '#fff',
        top: '50%',
        left: '50%',
        content: "'loading...'",
        transform: 'translate(-50%, -50%)',
        'z-index': '99999',
        'font-size': '20px',
        'background-color': '#222',
        padding: '5px 15px',
      }
      if (fldType === 'razorpay') draftStaticStyleState.staticStyles['.razorpay-checkout-frame'] = { height: '100% !important' }
    }))
  }

  const state = { fldKey: newBlk, layouts: newLayouts, fields: newFields, styles: newStyles }
  addToBuilderHistory({ event, type, state })

  setTimeout(() => {
    reCalculateFldHeights(newBlk)
  }, 100)

  return { newBlk, newLayouts }
}

export const generateNewFldName = (oldFldName, oldFLdKey, newFldKey) => {
  const oldFldKeyExceptFirstLetter = oldFLdKey.slice(1)
  const newFldKeyExceptFirstLetter = newFldKey.slice(1)
  const reg = new RegExp(oldFldKeyExceptFirstLetter, 'g')
  const newFldName = oldFldName.replace(reg, newFldKeyExceptFirstLetter)
  return newFldName
}

export const getInitHeightsForResizingTextarea = fldKey => {
  const fields = getRecoil($fields)
  const fldData = fields[fldKey]
  if (!fldData) return
  const fldType = fldData.typ
  if (fldType === 'textarea') {
    const wrpElm = selectInGrid(`[data-key="${fldKey}"]`)
    const textareaElm = selectInGrid(`textarea[data-dev-fld="${fldKey}"]`)
    const wrpHeight = getAbsoluteElmHeight(wrpElm, 0)
    const fldHeight = getAbsoluteElmHeight(textareaElm, 0)
    return { fldHeight, wrpHeight }
  }

  return {}
}

export const setResizingFldKey = (_, lay) => {
  const fldKey = lay.i
  setRecoil($resizingFld, { fieldKey: fldKey, ...getInitHeightsForResizingTextarea(fldKey) })
}

export const setResizingWX = (lays, lay) => {
  const resizingFld = getRecoil($resizingFld)
  if (resizingFld.fieldKey) {
    const layout = lays.find(l => l.i === resizingFld.fieldKey)
    const newResingFld = produce(resizingFld, draftResizingFld => {
      draftResizingFld.w = layout.w
      draftResizingFld.x = layout.x
    })
    setRecoil($resizingFld, newResingFld)
    return
  }
  const fldKey = lay.i
  const resizingData = { fieldKey: fldKey, ...getInitHeightsForResizingTextarea(fldKey) }
  setRecoil($resizingFld, { ...resizingData, w: lay.w, x: lay.x })
}

export const removeFieldStyles = fldKey => {
  const styles = getRecoil($styles)
  const newStyles = produce(styles, prevStyles => produce(prevStyles, draftStyles => {
    delete draftStyles.fields[fldKey]
  }))
  setRecoil($styles, newStyles)
}

export const cloneLayoutItem = (fldKey, parentFieldKey) => {
  const layouts = getRecoil($layouts)
  const fields = getRecoil($fields)
  const styles = getRecoil($styles)
  const nestedLayouts = getRecoil($nestedLayouts)
  const proModal = getRecoil($proModal)
  const uniqueFieldId = getRecoil($uniqueFieldId)
  const formID = getRecoil($formId)
  const contextMenu = getRecoil($contextMenu)
  const breakpoint = getRecoil($breakpoint)

  if (!IS_PRO) {
    setRecoil(proModal, { show: true, ...proHelperData.fieldClone })
    return
  }
  const fldData = fields[fldKey]
  // if (!handleFieldExtraAttr(fldData)) return

  const newBlk = `b${formID}-${uniqueFieldId}`
  const newLayItem = {}

  const allBreakpoints = ['sm', 'md', 'lg']
  let newLayouts
  if (parentFieldKey) {
    newLayouts = produce(nestedLayouts, draft => {
      allBreakpoints.forEach(brkpnt => {
        const layIndx = nestedLayouts[parentFieldKey][brkpnt].findIndex(lay => lay.i === fldKey)
        const { y, h } = nestedLayouts[parentFieldKey][brkpnt][layIndx]
        const newLayoutItem = { ...nestedLayouts[parentFieldKey][brkpnt][layIndx], i: newBlk, y: y + h }
        newLayItem[brkpnt] = newLayoutItem
        draft[parentFieldKey][brkpnt].splice(layIndx + 1, 0, newLayoutItem)
      })
    })
    setRecoil($nestedLayouts, newLayouts)
  }
  if (!parentFieldKey) {
    newLayouts = produce(layouts, draft => {
      allBreakpoints.forEach(brkpnt => {
        const layIndx = layouts[brkpnt].findIndex(lay => lay.i === fldKey)
        const { y, h } = layouts[brkpnt][layIndx]
        const newLayoutItem = { ...layouts[brkpnt][layIndx], i: newBlk, y: y + h }
        newLayItem[brkpnt] = newLayoutItem
        draft[brkpnt].splice(layIndx + 1, 0, newLayoutItem)
      })
    })
    setRecoil($layouts, newLayouts)
  }

  const newFldName = generateNewFldName(fldData.fieldName, fldKey, newBlk)
  const oldFields = produce(fields, draft => { draft[newBlk] = { ...fldData, fieldName: newFldName } })
  // eslint-disable-next-line no-param-reassign
  setRecoil($fields, oldFields)

  // clone style
  const newStyle = produce(styles, draftStyle => {
    const fldStyle = draftStyle.fields[fldKey]
    const fldClasses = fldStyle.classes
    draftStyle.fields[newBlk] = { ...fldStyle }
    draftStyle.fields[newBlk].classes = {}
    Object.keys(fldClasses).forEach(cls => {
      const newClassName = cls.replace(fldKey, newBlk)
      draftStyle.fields[newBlk].classes[newClassName] = fldClasses[cls]
    })
  })
  setRecoil($styles, newStyle)

  sessionStorage.setItem('btcd-lc', '-')

  setTimeout(() => {
    selectInGrid(`[data-key="${newBlk}"]`)?.focus()
    // .scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, 500)

  // add to history
  const event = `${generateFieldLblForHistory(fldData)} cloned`
  const type = 'clone_fld'
  const state = {
    fldKey: newBlk, breakpoint, layout: newLayItem, fldData, layouts: newLayouts, fields: oldFields, styles: getLatestState('styles'),
  }
  addToBuilderHistory({ event, type, state })

  // resetContextMenu()
  setRecoil(contextMenu, {})
}
