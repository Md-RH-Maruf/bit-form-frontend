// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { useEffect } from 'react'
import Cooltip from '../Utilities/Cooltip'
import FieldMap from './FieldMap'
import { addFieldMap } from './HelperFunction'

function Login({ fields, dataConf, setDataConf, pages, type }) {
  const loginFields = [
    {
      key: 'user_login',
      name: 'User Name or Email',
      required: true,
    },
    {
      key: 'password',
      name: 'Password',
      required: true,
    },
    {
      key: 'remember',
      name: 'Remember Me',
      required: true,
    },
  ]

  const inputHandler = (e) => {
    const tmpConf = { ...dataConf }
    const { name, value } = e.target
    tmpConf[type][name] = value
    setDataConf(tmpConf)
  }

  const handlePage = (e) => {
    const tmpConf = { ...dataConf }
    tmpConf[type].redirect_url = e.target.value
    setDataConf(tmpConf)
  }

  useEffect(() => {
    const tmpConf = { ...dataConf }
    if (!tmpConf[type]?.login_map[0]?.loginField) {
      tmpConf[type].login_map = loginFields.filter(fld => fld.required).map(fl => ({ formField: '', loginField: fl.key, required: fl.required }))
    }
    setDataConf(tmpConf)
  }, [])

  return (
    <div style={{ width: 800 }}>
      <div>
        <div>
          <div className="mt-3 mb-1"><b>Login Fields Mapping</b></div>
          <div className="btcd-hr" />
          <div className="flx flx-around mt-2 mb-1">
            <div className="txt-dp"><b>{__('Form Fields', 'bitform')}</b></div>
            <div className="txt-dp"><b>{__('Login Fields', 'bitform')}</b></div>
          </div>
        </div>
      </div>
      {dataConf[type]?.login_map?.map((itm, i) => (
        <FieldMap
          key={`analytics-m-${i + 9}`}
          i={i}
          type="login"
          field={itm}
          formFields={fields}
          dataConf={dataConf}
          setDataConf={setDataConf}
          customFields={loginFields}
        />
      ))}
      <br />
      <div className="flx integ-fld-wrp">
        <div className="w-5 ">
          <div className="f-m">{__('Redirect Page:', 'bitform')}</div>
          <select className="btcd-paper-inp mt-1" value={dataConf[type]?.redirect_url} onChange={handlePage}>
            <option value="">{__('Custom Link', 'bitform')}</option>
            {pages && pages.map((urlDetail, ind) => (
              <option key={`r-url-${ind + 22}`} value={urlDetail.url}>{urlDetail.title}</option>
            ))}
          </select>
        </div>
        <div className="w-5 ml-2">
          <div className="f-m">Link:</div>
          <input onChange={inputHandler} name="redirect_url" className="btcd-paper-inp mt-1" type="text" value={dataConf[type]?.redirect_url} />
        </div>
      </div>
      <br />
      <div className="f-m">Login Success Message </div>
      <input onChange={inputHandler} name="succ_msg" className="btcd-paper-inp mt-1 w-5" type="text" value={dataConf[type]?.succ_msg} />
    </div>
  )
}

export default Login
