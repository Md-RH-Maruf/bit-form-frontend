import { __ } from '../../../Utils/i18nwrap'
import MtInput from '../../Utilities/MtInput'
import { addFieldMap, delFieldMap, handleFieldMapping } from './AcfHelperFunction'

export default function FieldMap({ i, type, formFields, field, dataConf, setDataConf, customFields }) {
  const fldType = {
    acf: {
      propName: 'acf_map',
      fldName: 'acfField',
    },
    meta: {
      propName: 'meta_map',
      fldName: 'metaField',
    },
    post: {
      propName: 'post_map',
      fldName: 'postField',
    },
  }

  const { propName, fldName } = fldType[type]

  const handleCustomValue = (event, indx) => {
    const newConf = { ...dataConf }
    newConf[propName][indx].customValue = event.target.value
    setDataConf(newConf)
  }

  const isRequired = !!customFields.find(fl => fl.key === field[fldName] && fl.required)

  return (
    <div className="flx mt-2 mr-1">
      <div className="flx integ-fld-wrp">
        <select className="btcd-paper-inp mr-2" name="formField" value={field.formField || ''} onChange={(ev) => handleFieldMapping(propName, ev, i, dataConf, setDataConf)}>
          <option value="">{__('Select Field', 'bitform')}</option>
          {
            formFields.map(f => f.type !== 'file-up33' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
          }
          <option value="custom">{__('Custom...', 'bitform')}</option>
        </select>
        {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i)} label={__('Custom Value', 'bitform')} className="mr-2" type="text" value={field.customValue} placeholder={__('Custom Value', 'bitform')} />}

        {
          type === 'meta' ? (
            <>
              <input className="btcd-paper-inp" name={fldName} value={field[fldName] || ''} onChange={(ev) => handleFieldMapping(propName, ev, i, dataConf, setDataConf)} />
            </>
          ) : (
            <>
              <select className="btcd-paper-inp" name={fldName} value={field[fldName] || ''} onChange={(ev) => handleFieldMapping(propName, ev, i, dataConf, setDataConf)} disabled={isRequired}>
                <option value="">{__('Select Field', 'bitform')}</option>
                {
                  customFields?.map(header => (
                    <option key={`${header.key}-1`} value={header.key}>
                      {`${header.name}`}
                    </option>
                  ))
                }
              </select>
            </>
          )
        }

      </div>

      {!isRequired
        && (
          <>
            <button
              onClick={() => addFieldMap(propName, i, dataConf, setDataConf)}
              className="icn-btn sh-sm ml-2 mr-1"
              type="button"
            >
              +
            </button>
            <button onClick={() => delFieldMap(propName, i, dataConf, setDataConf)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
              <span className="btcd-icn icn-trash-2" />
            </button>
          </>
        )}

    </div>
  )
}
