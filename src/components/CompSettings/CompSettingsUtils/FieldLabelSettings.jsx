import produce from 'immer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields, $selectedFieldId } from '../../../GlobalStates'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import Cooltip from '../../Utilities/Cooltip'
import SingleToggle from '../../Utilities/SingleToggle'

export default function FieldLabelSettings() {
  const fldKey = useRecoilValue($selectedFieldId)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const label = fieldData.lbl || ''
  function setLabel(e) {
    if (e.target.value === '') {
      delete fieldData.lbl
    } else {
      fieldData.lbl = e.target.value
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  const hideFieldLabel = e => {
    if (!e.target.checked) {
      fieldData.valid.hideLbl = true
    } else {
      delete fieldData.valid.hideLbl
    }

    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
  }

  return (
    <div className="mt-3 setting-inp">
      <div className="flx flx-between">
        <div>
          <span>{__('Field Label:', 'bitform')}</span>
          <Cooltip width={250} icnSize={17} className="ml-2">
            <div className="txt-body">{__('By disabling this option, the field label will be hidden', 'bitform')}</div>
          </Cooltip>
        </div>
        <SingleToggle action={hideFieldLabel} isChecked={!fieldData.valid.hideLbl} />
      </div>
      <input className="btcd-paper-inp" type="text" onChange={setLabel} value={label} />
    </div>
  )
}
