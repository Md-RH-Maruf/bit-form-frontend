/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useContext, useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import TrashIcn from '../../Icons/TrashIcn'
import { AppSettings } from '../../Utils/AppSettingsContext'
import { deepCopy, sortArrOfObj } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import { razorpayCurrencyCodes } from '../../Utils/StaticData/razorpayData'
import CheckBox from '../Utilities/CheckBox'
import SelectBox2 from '../Utilities/SelectBox2'
import SingleInput from '../Utilities/SingleInput'
import SingleToggle from '../Utilities/SingleToggle'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'
import ut from '../../styles/2.utilities'
import FieldStyle from '../../styles/FieldStyle.style'
import FieldSettingsDivider from './CompSettingsUtils/FieldSettingsDivider'
import { $styles } from '../../GlobalStates/StylesState'

export default function RazorpayFieldSettings() {
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const formFields = Object.entries(fields)
  const { payments } = useContext(AppSettings)
  const { css } = useFela()
  const [payNotes, setPayNotes] = useState([{}])
  const isSubscription = fieldData?.payType === 'subscription'
  const isDynamicAmount = fieldData.options.amountType === 'dynamic'
  const setStyles = useSetRecoilState($styles)

  const pos = [
    { name: __('Left', 'bitform'), value: 'left' },
    { name: __('Center', 'bitform'), value: 'center' },
    { name: __('Right', 'bitform'), value: 'right' },
  ]

  const btnTheme = [
    { name: __('Razorpay Dark', 'bitform'), value: 'dark' },
    { name: __('Razorpay Light', 'bitform'), value: 'light' },
    { name: __('Razorpay Outline', 'bitform'), value: 'outline' },
    { name: __('Brand Color', 'bitform'), value: 'brand' },
  ]

  const setPayIntegId = e => {
    fieldData.payIntegID = e.target.value

    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const handleInput = (name, value, type) => {
    if (type) {
      if (!fieldData.options[type]) fieldData.options[type] = {}
      if (value) {
        fieldData.options[type][name] = value
      } else {
        delete fieldData.options[type][name]
      }
    } else if (value) {
      fieldData.options[name] = value
    } else {
      delete fieldData.options[name]
    }

    if (type === 'invoice' && name === 'generate') {
      fieldData.options.invoice.itemName = 'Due Amount'
    }

    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const setAmountType = e => {
    if (e.target.value) fieldData.options.amountType = e.target.value
    else delete fieldData.options.amountType
    delete fieldData.options.amount
    delete fieldData.options.amountFld

    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const handleBtnStyle = ({ target: { name, value } }) => {
    fieldData[name] = value
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    if (name === 'align') {
      setStyles(prvStyle => produce(prvStyle, drft => {
        drft.fields[fldKey].classes[`.${fldKey}-razorpay-wrp`]['justify-content'] = value
      }))
    }
  }

  const setFulW = (e) => {
    fieldData.fulW = e.target.checked
    // eslint-disable-next-line no-param-reassign
    setStyles(prvStyle => produce(prvStyle, drft => {
      if (e.target.checked) {
        drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`].width = '100%'
        delete drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`]['min-width']
      } else {
        drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`]['min-width'] = '160px'
        delete drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`].width
      }
    }))
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const setSubTitl = (e) => {
    fieldData.subTitl = e.target.checked

    console.log(fieldData)

    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const setBtnSiz = e => {
    if (e.target.checked) {
      fieldData.btnSiz = 'sm'
    } else {
      fieldData.btnSiz = 'md'
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const handleNotes = (action, i, type, val) => {
    const tmpNotes = [...payNotes]
    if (action === 'add') {
      tmpNotes.push({})
      setPayNotes(tmpNotes)
      return mapNotesToElmData(tmpNotes)
    }

    if (action === 'delete') {
      tmpNotes.splice(i, 1)
      setPayNotes(tmpNotes)
      return mapNotesToElmData(tmpNotes)
    }

    tmpNotes[i][type] = val
    setPayNotes(tmpNotes)
    mapNotesToElmData(tmpNotes)
  }

  const mapNotesToElmData = notes => {
    const noteObj = {}

    let i = -1
    const { length } = payNotes
    // eslint-disable-next-line no-plusplus
    while (++i < length) {
      if (notes[i]?.key && notes[i]?.value) {
        noteObj[notes[i].key] = notes[i].value
      }
    }

    fieldData.options.notes = noteObj
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const getSpecifiedFields = type => {
    let pattern
    if (type === 'amount') {
      pattern = /number|radio/g
    } else if (type === 'desc') {
      pattern = /text/g
    } else if (type === 'email') {
      pattern = /text|email/g
    } else if (type === 'number') {
      pattern = /number/g
    }
    const filteredFields = formFields.filter(field => field[1].typ.match(pattern))
    return filteredFields.map(itm => (<option key={itm[0]} value={itm[0]}>{itm[1].adminLbl || itm[1].lbl}</option>))
  }

  const getRazorpayConfigs = () => {
    const razorpayConfigs = payments.filter(pay => pay.type === 'Razorpay')
    return razorpayConfigs.map(razor => (
      <option key={razor.id} value={razor.id}>{razor.name}</option>
    ))
  }

  const handBtnTheme = (e) => {
    const themeValue = e.target.value
    fieldData.btnTheme = themeValue
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    setStyles(prvStyle => produce(prvStyle, drft => {
      switch (themeValue) {
        case 'dark':
          drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`].background = 'hsla(216, 85%, 18%, 100%)'
          drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`].border = 'solid hsla(216, 85%, 18%, 100%)'
          drft.fields[fldKey].classes[`.${fldKey}-btn-text`].color = 'hsla(0, 0%, 100%, 100%)'
          drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn::before`].background = 'hsla(224, 68%, 37%, 100%)'

          break
        case 'light':
          drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`].background = 'hsla(0, 0%, 100%, 100%)'
          drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`].border = 'solid hsla(0, 0%, 100%, 100%)'
          drft.fields[fldKey].classes[`.${fldKey}-btn-text`].color = 'hsla(216, 85%, 18%, 100%)'
          drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn::before`].background = 'hsla(224, 68%, 37%, 100%)'

          break
        case 'outline':
          drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`].background = 'hsla(216, 91%, 96%, 100%)'
          drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`].border = 'solid hsla(216, 85%, 18%, 100%)'
          drft.fields[fldKey].classes[`.${fldKey}-btn-text`].color = 'hsla(216, 85%, 18%, 100%)'
          drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn::before`].background = 'hsla(224, 68%, 37%, 100%)'

          break
        case 'brand':
          drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`].background = 'hsl(241, 100%, 50%, 100%)'
          drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn`].border = 'solid hsl(241, 100%, 50%, 100%)'
          drft.fields[fldKey].classes[`.${fldKey}-btn-text`].color = 'hsla(0, 0%, 100%, 100%)'
          drft.fields[fldKey].classes[`.${fldKey}-razorpay-btn::before`].background = 'hsla(241, 100%, 50%, 100%)'
          break
        default:
          break
      }
    }))
  }

  return (
    <div>
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ}
        fieldKey={fldKey}
      />

      <div className={css(ut.ml2, ut.mr2, ut.mt2, ut.p1)}>
        <b>{__('Select Config', 'bitform')}</b>
        <br />
        <select name="payIntegID" id="payIntegID" onChange={setPayIntegId} className={css(FieldStyle.input)} value={fieldData.payIntegID}>
          <option value="">Select Config</option>
          {getRazorpayConfigs()}
        </select>
      </div>

      {/* <div className="mt-2">
        <SingleToggle title={__('Subscription:', 'bitform')} action={setSubscription} isChecked={isSubscription} className="mt-3" />
        {isSubscription && <SingleInput inpType="text" title={__('Plan Id', 'bitform')} value={fieldData.planId || ''} action={e => handleInput('planId', e.target.value)} />}
      </div> */}

      {fieldData?.payIntegID && (
        <>
          {!isSubscription && (
            <>
              <div>
                <div className={css(ut.ml2, ut.p1)}>
                  <b>{__('Amount Type', 'bitform')}</b>
                  <br />
                  <CheckBox onChange={setAmountType} radio checked={!isDynamicAmount} title={__('Fixed', 'bitform')} />
                  <CheckBox onChange={setAmountType} radio checked={isDynamicAmount} title={__('Dynamic', 'bitform')} value="dynamic" />
                </div>
                {!isDynamicAmount && (
                  <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                    <SingleInput
                      inpType="number"
                      title={__('Amount', 'bitform')}
                      value={fieldData.options.amount || ''}
                      action={e => handleInput('amount', e.target.value)}
                      cls={css(FieldStyle.input)}
                    />
                  </div>
                )}
                {isDynamicAmount && (
                  <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                    <b>{__('Select Amount Field', 'bitform')}</b>
                    <select onChange={e => handleInput(e.target.name, e.target.value)} name="amountFld" className={css(FieldStyle.input)} value={fieldData.options.amountFld}>
                      <option value="">{__('Select Field', 'bitform')}</option>
                      {getSpecifiedFields('amount')}
                    </select>
                  </div>
                )}
              </div>
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <label htmlFor="recap-thm">
                  <b>{__('Currency', 'bitform')}</b>
                  <select onChange={e => handleInput(e.target.name, e.target.value)} name="currency" value={fieldData.options.currency} className={css(FieldStyle.input)}>
                    {sortArrOfObj(razorpayCurrencyCodes, 'currency').map(itm => (
                      <option key={itm.currency} value={itm.code}>
                        {`${itm.currency} - ${itm.code}`}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <b>{__('Account Name', 'bitform')}</b>
                <br />
                <input aria-label="Account Name" type="text" className={css(FieldStyle.input)} placeholder="Account Name" name="name" value={fieldData.options.name || ''} onChange={e => handleInput(e.target.name, e.target.value)} />
              </div>
              <div className={css(ut.ml2, ut.mr2, ut.p1)}>
                <b>{__('Description', 'bitform')}</b>
                <br />
                <textarea className={css(FieldStyle.input)} placeholder="Order Description" name="description" rows="5" value={fieldData.options.description || ''} onChange={e => handleInput(e.target.name, e.target.value)} />
              </div>
            </>
          )}
          <FieldSettingsDivider />
          <SimpleAccordion
            title="Additional Settings"
            className={css(FieldStyle.fieldSection)}
          >
            <SimpleAccordion
              title="Button"
              className={css(FieldStyle.fieldSection)}
            >
              <SingleInput
                inpType="text"
                title={__('Button Text', 'bitform')}
                value={fieldData.btnTxt || ''}
                name="btnTxt"
                action={handleBtnStyle}
                className={css(ut.mt0, { pr: 1 })}
                cls={css(FieldStyle.input)}
              />
              <SelectBox2
                className={css({ pr: 1 })}
                title={__('Button Align:', 'bitform')}
                options={pos}
                value={fieldData.align}
                action={handleBtnStyle}
                name="align"
                cls={css(FieldStyle.input)}
              />
              <SelectBox2
                className={css({ pr: 1 })}
                title={__('Button Theme:', 'bitform')}
                options={btnTheme}
                value={fieldData.btnTheme}
                action={handBtnTheme}
                name="align"
                cls={css(FieldStyle.input)}
              />
              <SingleToggle
                title={__('Full Width Button:', 'bitform')}
                action={setFulW}
                isChecked={fieldData.fulW}
                className="mt-5"
              />
              <SingleToggle
                title={__('Sub Title:', 'bitform')}
                action={setSubTitl}
                isChecked={fieldData?.subTitl}
                className="mt-5"
              />
              {/* <SingleToggle
                title={__('Small Button:', 'bitform')}
                action={setBtnSiz}
                isChecked={fieldData.btnSiz === 'sm'}
                className="mt-5"
              /> */}
            </SimpleAccordion>
            <div className="btcd-hr" />

            <SimpleAccordion title="Theme" className={css(FieldStyle.fieldSection)}>
              <div className={css(ut.flxcb, ut.mt2)}>
                <b>{__('Theme Color:', 'bitform')}</b>
                <input aria-label="Theme color" className="ml-2" type="color" value={fieldData.options.theme.color} onChange={e => handleInput('color', e.target.value, 'theme')} />
              </div>
              <div className={css(ut.flxcb, ut.mt2)}>
                <b>{__('Background Color:', 'bitform')}</b>
                <input aria-label="Background color" className="ml-2" type="color" value={fieldData.options.theme.backdrop_color} onChange={e => handleInput('backdrop_color', e.target.value, 'theme')} />
              </div>
            </SimpleAccordion>
            <div className="btcd-hr" />

            <SimpleAccordion title="Modal" className={css(FieldStyle.fieldSection)}>
              <SingleToggle className={css(ut.mt2)} title={__('Confirm on Close:', 'bitform')} action={e => handleInput('confirm_close', e.target.checked, 'modal')} isChecked={fieldData.options.modal.confirm_close} />
            </SimpleAccordion>
            <div className="btcd-hr" />

            <SimpleAccordion title="Prefill" className={css(FieldStyle.fieldSection)}>
              <div>
                <div className={css(ut.mt2, { px: 1 })}>
                  <b>{__('Name :', 'bitform')}</b>
                  <select onChange={e => handleInput(e.target.name, e.target.value, 'prefill')} name="prefillNameFld" className={css(FieldStyle.input)} value={fieldData.options.prefill.prefillNameFld}>
                    <option value="">{__('Select Field', 'bitform')}</option>
                    {getSpecifiedFields('desc')}
                  </select>
                </div>
                <div className={css(ut.mt2, { px: 1 })}>
                  <b>{__('Email :', 'bitform')}</b>
                  <select onChange={e => handleInput(e.target.name, e.target.value, 'prefill')} name="prefillEmailFld" className={css(FieldStyle.input)} value={fieldData.options.prefill.prefillEmailFld}>
                    <option value="">{__('Select Field', 'bitform')}</option>
                    {getSpecifiedFields('email')}
                  </select>
                </div>
                <div className={css(ut.mt2, { px: 1 })}>
                  <b>{__('Contact :', 'bitform')}</b>
                  <select onChange={e => handleInput(e.target.name, e.target.value, 'prefill')} name="prefillContactFld" className={css(FieldStyle.input)} value={fieldData.options.prefill.prefillContactFld}>
                    <option value="">{__('Select Field', 'bitform')}</option>
                    {getSpecifiedFields('number')}
                  </select>
                </div>
              </div>
            </SimpleAccordion>
            <div className="btcd-hr" />

            <SimpleAccordion title="Notes" className={css(FieldStyle.fieldSection)}>
              <div className="flx">
                <div className="w-10"><b>{__('Key :', 'bitform')}</b></div>
                <div className="w-10"><b>{__('Value :', 'bitform')}</b></div>
              </div>
              {payNotes.map((notes, indx) => (
                <div className="flx" key={`rp${indx * 2}`}>
                  <div className={css({ pl: 2 })}>
                    <input aria-label="Note key" className={css(FieldStyle.input, { pr: 1 })} type="text" value={notes.key} onChange={e => handleNotes('edit', indx, 'key', e.target.value)} />
                  </div>
                  <div className="ml-1">
                    <input aria-label="Note value" className={css(FieldStyle.input)} type="text" value={notes.value} onChange={e => handleNotes('edit', indx, 'value', e.target.value)} />
                  </div>
                  <button className="icn-btn ml-1 mt-3" type="button" aria-label="btn" onClick={() => handleNotes('delete', indx)}>
                    <TrashIcn />
                  </button>
                </div>
              ))}
              <div className="txt-center mt-2"><button className="icn-btn" type="button" onClick={() => handleNotes('add')}>+</button></div>
            </SimpleAccordion>
            {/* <div className="btcd-hr" /> */}
            {/* invoice */}
            {/* <SimpleAccordion title="Invoice" className={css(FieldStyle.fieldSection)}>
              <SingleToggle title={__('Generate Invoice', 'bitform')} action={e => handleInput('generate', e.target.checked, 'invoice')} isChecked={fieldData.options?.invoice?.generate} />
              <SingleInput inpType="text" title={__('Item Name', 'bitform')} value={fieldData.options?.invoice?.itemName || ''} name="btnTxt" action={e => handleInput('itemName', e.target.value, 'invoice')} className="mt-3" />
              <SingleToggle title={__('Send SMS to customer', 'bitform')} action={e => handleInput('sendSMS', e.target.checked, 'invoice')} isChecked={fieldData.options?.invoice?.sendSMS} className="mt-3" />
              <SingleToggle title={__('Send Email to customer', 'bitform')} action={e => handleInput('sendEmail', e.target.checked, 'invoice')} isChecked={fieldData.options?.invoice?.sendEmail} className="mt-3" />
            </SimpleAccordion>
            <div className="btcd-hr" /> */}
          </SimpleAccordion>
          <FieldSettingsDivider />
        </>
      )}

    </div>
  )
}
