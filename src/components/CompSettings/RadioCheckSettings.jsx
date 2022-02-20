/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { memo, useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $bits, $builderHistory, $fields, $updateBtn } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import app from '../../styles/app.style'
import FieldStyle from '../../styles/FieldStyle.style'
import { addToBuilderHistory } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import Modal from '../Utilities/Modal'
import SingleToggle from '../Utilities/SingleToggle'
import AutoResizeInput from './CompSettingsUtils/AutoResizeInput'
import ErrorMessageSettings from './CompSettingsUtils/ErrorMessageSettings'
import FieldLabelSettings from './CompSettingsUtils/FieldLabelSettings'
import EditOptions from './EditOptions/EditOptions'
import SimpleAccordion from './StyleCustomize/ChildComp/SimpleAccordion'
import FieldSettingTitle from './StyleCustomize/FieldSettingTitle'
import SubTitleSetting from './SubTitleSetting'

function RadioCheckSettings() {
  console.log('%c $render RadioCheckSettings', 'background:royalblue;padding:3px;border-radius:5px;color:white')
  const bits = useRecoilValue($bits)
  const { isPro } = bits
  const { css } = useFela()
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const options = deepCopy(fields[fldKey].opt)
  const adminLabel = fieldData.adminLbl || ''
  const fieldName = fieldData.fieldName || fldKey
  const isRound = fieldData.round || false
  const isRadioRequired = fieldData.valid.req || false
  const optionCol = fieldData?.optionCol === undefined ? '' : fieldData?.optionCol

  const isOptionRequired = fieldData.opt.find(opt => opt.req)
  const min = fieldData.mn || ''
  const max = fieldData.mx || ''
  const dataSrc = fieldData?.customType?.type || 'fileupload'
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const setStyles = useSetRecoilState($styles)

  let fieldObject = null
  let disabled = false
  if (fieldData?.customType?.type) {
    disabled = true
    fieldObject = fieldData?.customType
  }
  const [importOpts, setImportOpts] = useState({})
  const [optionMdl, setOptionMdl] = useState(false)
  useEffect(() => setImportOpts({ dataSrc, fieldObject, disabled }), [fldKey])

  function setAdminLabel(e) {
    if (e.target.value === '') {
      delete fieldData.adminLbl
    } else {
      fieldData.adminLbl = e.target.value
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Admin label updated: ${adminLabel || fieldData.lbl || fldKey}`, type: 'change_adminlabel', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setRound(e) {
    let bdr
    if (e.target.checked) {
      fieldData.round = true
      bdr = '50%'
    } else {
      delete fieldData.round
      bdr = '5px'
    }
    setStyles(prvStyles => produce(prvStyles, drft => {
      drft.fields[fldKey].classes[`.${fldKey}-ck`]['border-radius'] = bdr
    }))
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Option rounded ${e.target.checked ? 'on' : 'off'}`, type: 'set_round', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function rmvOpt(ind) {
    options.splice(ind, 1)
    fieldData.opt = options
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Option removed: ${fieldData.opt[ind].lbl}`, type: `rmv_option_${Math.random() * 2 * 5 + 2}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function addOpt() {
    options.push({ lbl: `Option ${options.length + 1}` })
    fieldData.opt = options
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Option added: ${fieldData.opt}`, type: `add_option_${Math.random() * 8 * 4 + 2}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setCheck(e, i) {
    if (fieldData.typ === 'radio') {
      for (let ind = 0; ind < options.length; ind += 1) {
        delete options[ind].check
      }
    }

    if (e.target.checked) {
      const tmp = { ...options[i] }
      tmp.check = true
      options[i] = tmp
    } else {
      delete options[i].check
    }
    fieldData.opt = options
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Check by default ${e.target.checked ? 'on' : 'off'} : {option_label}`, type: `set_check_${Math.random() * 5 * 4 + 3}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setReq(e, i) {
    if (e.target.checked) {
      const tmp = { ...options[i] }
      tmp.req = true
      options[i] = tmp
    } else {
      delete options[i].req
    }
    fieldData.opt = options
    const reqOpts = options.filter(opt => opt.req).map(op => op.lbl).join(', ')
    if (!fieldData.err) fieldData.err = {}
    if (!fieldData.err.req) fieldData.err.req = {}
    fieldData.err.req.dflt = reqOpts ? `<p>${reqOpts} is required</p>` : '<p>This field is required</p>'
    fieldData.err.req.show = true
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Field required ${req}: ${fieldData.lbl || adminLabel || fldKey}`, type: `Field required ${req} : ${fieldData.lbl || adminLabel || fldKey}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setRadioRequired = e => {
    if (e.target.checked) {
      fieldData.valid.req = true
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.req) fieldData.err.req = {}
      fieldData.err.req.dflt = '<p>This field is required</p>'
      fieldData.err.req.show = true
    } else {
      delete fieldData.valid.req
      delete fieldData.mn
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Option rounded ${e.target.checked ? 'on' : 'off'}`, type: 'set_round', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setOptLbl(e, i) {
    const tmp = { ...options[i] }
    tmp.lbl = e.target.value
    options[i] = tmp
    fieldData.opt = options
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Option label updated: ${fieldData.lbl || adminLabel || fldKey}`, type: `set_opt_label_${Math.random() * 4 * 2 + 5}`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const openImportModal = () => {
    importOpts.show = true
    setImportOpts({ ...importOpts })
  }

  const openOptionModal = () => {
    setOptionMdl(true)
  }

  const closeOptionModal = () => {
    setOptionMdl(false)
  }

  const closeImportModal = () => {
    delete importOpts.show
    setImportOpts({ ...importOpts })
  }

  function setMin(e) {
    if (!isPro) return
    if (!Number(e.target.value)) {
      delete fieldData.mn
      setRadioRequired({ target: { checked: false } })
    } else {
      fieldData.mn = e.target.value
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.mn) fieldData.err.mn = {}
      fieldData.err.mn.dflt = `<p>Minimum ${e.target.value} option${Number(e.target.value) > 1 ? 's' : ''}<p>`
      fieldData.err.mn.show = true
      if (!isOptionRequired) setRadioRequired({ target: { checked: true } })
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Min value updated to ${e.target.value}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_min', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  function setMax(e) {
    if (!isPro) return
    if (e.target.value === '') {
      delete fieldData.mx
    } else {
      fieldData.mx = e.target.value
      if (!fieldData.err) fieldData.err = {}
      if (!fieldData.err.mx) fieldData.err.mx = {}
      fieldData.err.mx.dflt = `<p>Maximum ${e.target.value} option${Number(e.target.value) > 1 ? 's' : ''}</p>`
      fieldData.err.mx.show = true
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Max value updated to ${e.target.value}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_max', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const setDisabledOnMax = e => {
    if (!isPro) return
    if (e.target.checked) {
      fieldData.valid.disableOnMax = true
    } else {
      delete fieldData.valid.disableOnMax
    }
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Disable on max selected ${e.target.checked ? 'on' : 'off'}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'set_disable_on_max', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const hideAdminLabel = (e) => {
    if (e.target.checked) {
      fieldData.adminLbl = fieldData.lbl || fldKey
    } else {
      delete fieldData.adminLbl
    }
    const req = e.target.checked ? 'on' : 'off'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `${req} Admin label: ${fieldData.lbl || adminLabel || fldKey}`, type: `${req}_adminlabel`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const handleFieldName = ({ target: { value } }) => {
    if (value !== '') fieldData.fieldName = value
    else fieldData.fieldName = fldKey

    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `Field name updated ${value}: ${fieldData.lbl || adminLabel || fldKey}`, type: 'change_field_name', state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  const handleOptions = newOpts => {
    setFields(allFields => produce(allFields, draft => { draft[fldKey].opt = newOpts }))
  }

  function setColumn({ target: { value } }) {
    if (value === '') {
      delete fieldData.optionCol
    } else {
      fieldData.optionCol = value
    }
    const req = value ? 'Add' : 'Remove'
    const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
    let colStr = ''
    for (let colindx = 0; colindx < value; colindx += 1) {
      colStr += 'auto '
    }
    setStyles(prvStyle => produce(prvStyle, drft => {
      const gridStyle = {
        display: 'grid',
        'grid-template-columns': colStr,
        width: '100%',
        'grid-row-gap': '10px',
        'column-gap': '10px',
      }

      const flxStyle = {
        display: 'flex',
        'flex-wrap': 'wrap',
        'margin-top': '8px',
      }

      drft.fields[fldKey].classes[`.${fldKey}-cc`] = value === '' ? flxStyle : gridStyle
    }))
    setFields(allFields)
    addToBuilderHistory(setBuilderHistory, { event: `${req} Column: ${fieldData.lbl || adminLabel || fldKey}`, type: `${req.toLowerCase()}_column`, state: { fields: allFields, fldKey } }, setUpdateBtn)
  }

  return (
    <div className="">
      <FieldSettingTitle
        title="Field Settings"
        subtitle={fieldData.typ === 'check' ? 'Check Box' : 'Radio'}
        fieldKey={fldKey}
      />

      <FieldLabelSettings />

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Admin Label', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={hideAdminLabel}
        toggleChecked={fieldData?.adminLbl !== undefined}
        open={fieldData?.adminLbl !== undefined}
        disable={!fieldData?.adminLbl}
      >
        <div className={css(FieldStyle.placeholder)}>
          <AutoResizeInput
            ariaLabel="Admin label"
            value={adminLabel}
            changeAction={e => setAdminLabel(e)}
          />
        </div>
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      <SubTitleSetting />

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Name', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(FieldStyle.placeholder)}>
          <input
            aria-label="Name for this Field"
            placeholder="Type field name here..."
            className={css(FieldStyle.input)}
            value={fieldName}
            onChange={handleFieldName}
          />
        </div>
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      <SimpleAccordion
        title={__('Required', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        switching
        toggleAction={setRadioRequired}
        toggleChecked={isRadioRequired}
        open
      >
        {(isRadioRequired || isOptionRequired) && (
          <ErrorMessageSettings
            type="req"
            title="Error Message"
            tipTitle="By enabling this feature, user will see the error message when required option is not checked"
          />
        )}
      </SimpleAccordion>

      <hr className={css(FieldStyle.divider)} />

      <div className={`${css(FieldStyle.fieldSection)} ${css({ pr: 36 })}`}>
        <SingleToggle
          title={__('Rounded', 'bitform')}
          action={e => setRound(e)}
          isChecked={isRound}
        />
      </div>

      <hr className={css(FieldStyle.divider)} />
      <SimpleAccordion
        title={__('Options Column', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <div className={css(FieldStyle.placeholder)}>
          <input aria-label="Option Column" className={css(FieldStyle.input)} min="1" type="number" value={optionCol} onChange={setColumn} />
        </div>
      </SimpleAccordion>
      <hr className={css(FieldStyle.divider)} />

      {/* <SingleInput inpType="text" title={__('Admin Label:', 'bitform')} value={adminLabel} action={setAdminLabel} /> */}

      {/* <SingleToggle title={__('Required:', 'bitform')} action={setRadioRequired} isChecked={isRadioRequired} disabled={isOptionRequired} className="mt-3" />
      {(isRadioRequired || isOptionRequired) && (
        <ErrorMessageSettings
          type="req"
          title="Error Message"
          tipTitle="By enabling this feature, user will see the error message when required option is not checked"
        />
      )} */}
      {
        fieldData.typ === 'check' && (
          <>
            <SimpleAccordion
              title={__('Minimum', 'bitform')}
              className={css(FieldStyle.fieldSection)}
              tip="Set minimum number to be selected for checkbox option"
              open
              isPro
            >
              {/* <div>
                <div className="flx mt-2 mb-2">
                  <h4 className="m-0">{__('Minimum:', 'bitform')}</h4>
                  <Cooltip width={250} icnSize={17} className="ml-2">
                    <div className="txt-body">{__('Set minimum number to be selected for checkbox option', 'bitform')}</div>
                  </Cooltip>
                  {!bits.isPro && <span className="pro-badge ml-2">{__('Pro', 'bitform')}</span>}
                </div>
                <input className="btcd-paper-inp" type="number" value={min} onChange={setMin} disabled={!isPro} />
              </div> */}
              <div className={css(FieldStyle.placeholder)}>
                <input aria-label="Minimum number" className={css(FieldStyle.input)} value={min} type="text" onChange={setMin} disabled={!isPro} />
              </div>

              {fieldData.mn && (
                <ErrorMessageSettings
                  type="mn"
                  title="Min Error Message"
                  tipTitle={`By enabling this feature, user will see the error message when selected checkbox is less than ${fieldData.mn}`}
                />
              )}
            </SimpleAccordion>

            <hr className={css(FieldStyle.divider)} />

            <SimpleAccordion
              title={__('Maximum', 'bitform')}
              className={css(FieldStyle.fieldSection)}
              tip="Set maximum number to be selected for checkbox option"
              open
              isPro
            >
              <div className={css(FieldStyle.placeholder)}>
                <input aria-label="maximim number" className={css(FieldStyle.input)} value={max} type="number" onChange={setMax} disabled={!isPro} />
              </div>

              {fieldData.mx && (
                <>
                  <ErrorMessageSettings
                    type="mx"
                    title="Max Error Message"
                    tipTitle={`By enabling this feature, user will see the error message when selected checkbox is greater than ${fieldData.mx}`}
                  />
                  <SingleToggle title={__('Disable if maximum selected:', 'bitform')} action={setDisabledOnMax} isChecked={fieldData.valid.disableOnMax} disabled={!isPro} className="mt-3 mb-2" />
                </>
              )}
            </SimpleAccordion>

            <hr className={css(FieldStyle.divider)} />

            {/* <div>
              <div className="flx mt-2 mb-2">
                <h4 className="m-0">{__('Maximum:', 'bitform')}</h4>
                <Cooltip width={250} icnSize={17} className="ml-2">
                  <div className="txt-body">{__('Set maximum number to be selected for checkbox option', 'bitform')}</div>
                </Cooltip>
                {!bits.isPro && <span className="pro-badge ml-2">{__('Pro', 'bitform')}</span>}
              </div>
              <input className="btcd-paper-inp" type="number" value={max} onChange={setMax} disabled={!isPro} />
            </div>
            {fieldData.mx && (
              <>
                <ErrorMessageSettings
                  type="mx"
                  title="Max Error Message"
                  tipTitle={`By enabling this feature, user will see the error message when selected checkbox is greater than ${fieldData.mx}`}
                />
                <SingleToggle title={__('Disable if maximum selected:', 'bitform')} action={setDisabledOnMax} isChecked={fieldData.valid.disableOnMax} disabled={!isPro} className="mt-3 mb-2" />
              </>
            )} */}

          </>
        )
      }
      <div className="pos-rel">
        {/* {!bits.isPro && (
          <div className="pro-blur flx" style={{ height: '100%', left: 0, width: '100%', marginTop: 14 }}>
            <div className="pro">
              {__('Available On', 'bitform')}
              <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
                <span className="txt-pro">
                  {' '}
                  {__('Premium', 'bitform')}
                </span>
              </a>
            </div>
          </div>
        )} */}
        <ErrorMessageSettings
          type="entryUnique"
          title="Validate as Entry Unique"
          tipTitle="Enabling this option will check from the entry database whether its value is duplicate."
          className={css(FieldStyle.fieldSection)}
          isPro
          defaultMsg="The value is already taken. Try another."
        />
      </div>

      <hr className={css(FieldStyle.divider)} />

      {/* <SimpleAccordion
        title={__('Options', 'bitform')}
        className={css(FieldStyle.fieldSection)}
        open
      >
        <>
          <button onClick={openImportModal} className={css(app.btn)} type="button">
            <DownloadIcon size="16" />
            &nbsp;
            {__('Import Options', 'bitform')}
          </button>
          <div className="opt mt-1">
            <span className="font-w-m">{__('Options:', 'bitform')}</span>
            {options.map((itm, i) => (
              <div key={`opt-${i + 8}`} className="flx flx-between">
                <SingleInput inpType="text" value={itm.lbl} action={e => setOptLbl(e, i)} width={140} className="mt-0" />
                <div className="flx mt-1">
                  {fieldData.typ === 'check'
                    && (
                      <label className="btcd-ck-wrp tooltip m-0" style={{ '--tooltip-txt': `'${__('Required', 'bitform')}'` }}>
                        <input aria-label="checkbox" onChange={(e) => setReq(e, i)} type="checkbox" checked={itm.req !== undefined} disabled={isRadioRequired} />
                        <span className="btcd-mrk ck br-50 " />
                      </label>
                    )}
                  <label className="btcd-ck-wrp tooltip m-0" style={{ '--tooltip-txt': `'${__('Check by Default', 'bitform')}'` }}>
                    <input aria-label="checkbox" onChange={(e) => setCheck(e, i)} type="checkbox" checked={itm.check !== undefined} />
                    <span className="btcd-mrk ck br-50 " />
                  </label>
                  <button onClick={() => rmvOpt(i)} className={`${css(app.btn)} cls-btn`} type="button" aria-label="close"><CloseIcn size="12" /></button>
                </div>
              </div>
            ))}
            <button onClick={addOpt} className={`${css(app.btn)} blue`} type="button">
              {__('Add More +', 'bitform')}
            </button>
          </div>
        </>
      </SimpleAccordion> */}
      <hr className={css(FieldStyle.divider)} />

      {/* <button onClick={openImportModal} className={css(app.btn)} type="button">
        <DownloadIcon size="16" />
        &nbsp;
        {__('Import Options', 'bitform')}
      </button> */}
      {/* <br /> */}
      <button onClick={openOptionModal} className={css(app.btn)} type="button">
        &nbsp;
        {__('Edit Options', 'bitform')}
      </button>
      <Modal
        md
        autoHeight
        show={optionMdl}
        setModal={closeOptionModal}
        className="o-v"
        title={__('Options', 'bitform')}
      >
        <div className="pos-rel">
          {!isPro && (
            <div className="pro-blur flx" style={{ top: -7, width: '105%', left: -17 }}>
              <div className="pro">
                {__('Available On', 'bitform')}
                <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
                  <span className="txt-pro">
                    &nbsp;
                    {__('Premium', 'bitform')}
                  </span>
                </a>
              </div>
            </div>
          )}
          <EditOptions
            optionMdl={optionMdl}
            options={options}
            setOptions={newOpts => handleOptions(newOpts)}
            lblKey="lbl"
            valKey="val"
            type={fieldData.typ}
          />
        </div>
      </Modal>
      {/* <Modal
        md
        autoHeight
        show={importOpts.show}
        setModal={closeImportModal}
        className="o-v"
        title={__('Import Options', 'bitform')}
      >
        <div className="pos-rel">
          {!isPro && (
            <div className="pro-blur flx" style={{ top: -7, width: '105%', left: -17 }}>
              <div className="pro">
                {__('Available On', 'bitform')}
                <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
                  <span className="txt-pro">
                    &nbsp;
                    {__('Premium', 'bitform')}
                  </span>
                </a>
              </div>
            </div>
          )}
          <ImportOptions
            importOpts={importOpts}
            setImportOpts={setImportOpts}
            lblKey="lbl"
            valKey="val"
            customType={fieldData}
          />
        </div>
      </Modal> */}
    </div>
  )
}

export default memo(RadioCheckSettings)
