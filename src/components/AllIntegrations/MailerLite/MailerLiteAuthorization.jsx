/* eslint-disable no-unused-expressions */
import { useState } from 'react'
import { __ } from '../../../Utils/i18nwrap'
import LoaderSm from '../../Loaders/LoaderSm'
import Note from '../../Utilities/Note'
import { mailerliteRefreshFields } from './MailerLiteCommonFunc'

export default function MailerLiteAuthorization({ mailerLiteConf, setMailerLiteConf, step, setstep, isLoading, setIsLoading, setSnackbar, isInfo }) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const [error, setError] = useState({ name: '', auth_token: '' })

  const nextPage = () => {
    !mailerLiteConf?.default
    setstep(2)
    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }
  const handleInput = e => {
    const newConf = { ...mailerLiteConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setMailerLiteConf(newConf)
  }
  const note = `
    <h4> Step of generate API token:</h4>
    <ul>
      <li>Goto <a href="https://dashboard.mailerlite.com/integrations/api">Generate API Token</a></li>
      <li>Copy the <b>Token</b> and paste into <b>API Token</b> field of your authorization form.</li>
      <li>Finally, click <b>Authorize</b> button.</li>
  </ul>
  `

  return (
    <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && 'auto' } }}>
      <div className="mt-3"><b>{__('Integration Name:', 'bit-integrations')}</b></div>
      <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="name" value={mailerLiteConf.name} type="text" placeholder={__('Integration Name...', 'bit-integrations')} disabled={isInfo} />

      <small className="d-blk mt-3">
        {__('To Get API token, Please Visit', 'bit-integrations')}
        &nbsp;
        <a className="btcd-link" href="https://dashboard.mailerlite.com/integrations/api" target="_blank" rel="noreferrer">{__('MailerLite API Token', 'bit-integrations')}</a>
      </small>

      <div className="mt-3"><b>{__('API Token:', 'bit-integrations')}</b></div>
      <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="auth_token" value={mailerLiteConf.auth_token} type="text" placeholder={__('Auth Token...', 'bit-integrations')} disabled={isInfo} />
      <div style={{ color: 'red', fontSize: '15px' }}>{error.auth_token}</div>

      {!isInfo && (
        <div>
          <button onClick={() => mailerliteRefreshFields(mailerLiteConf, setMailerLiteConf, setError, setisAuthorized, setIsLoading, setSnackbar)} className="btn btcd-btn-lg green sh-sm flx" type="button" disabled={isAuthorized || isLoading}>
            {isAuthorized ? __('Authorized ✔', 'bit-integrations') : __('Authorize', 'bit-integrations')}
            {isLoading && <LoaderSm size="20" clr="#022217" className="ml-2" />}
          </button>
          <br />
          <button onClick={nextPage} className="btn ml-auto btcd-btn-lg green sh-sm flx" type="button" disabled={!isAuthorized}>
            {__('Next', 'bit-integrations')}
            <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
          </button>
        </div>
      )}
      <Note note={note} />
    </div>
  )
}
