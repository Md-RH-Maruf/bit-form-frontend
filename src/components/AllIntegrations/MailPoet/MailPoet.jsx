import { __ } from '../../../Utils/i18nwrap'
import { useEffect, useState } from 'react'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../Utilities/SnackMsg'
import Steps from '../../Utilities/Steps'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import MailPoetAuthorization from './MailPoetAuthorization'
import MailPoetIntegLayout from './MailPoetIntegLayout'
import { checkMappedFields, refreshNewsLetter } from './MailPoetCommonFunc'

export default function MailPoet({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isLoading, setisLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const [mailPoetConf, setMailPoetConf] = useState({
    name: 'Mail Poet',
    type: 'Mail Poet',
    field_map: [
      { formField: '', mailPoetField: '' },
    ],
    actions: {},
  })

  const nextPage = (val) => {
    if (val === 3) {
      if (!checkMappedFields(mailPoetConf)) {
        setSnackbar({ show: true, msg: 'Please map all required fields to continue.' })
        return
      }
      if (mailPoetConf.name !== '' && mailPoetConf.field_map.length > 0) {
        setStep(val)
      }
    } else {
      setStep(val)
      if (val === 2 && mailPoetConf.name) {
        refreshNewsLetter(formID, mailPoetConf, setMailPoetConf, setisLoading, setSnackbar)
      }
    }

    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  console.log('mailPoetConf', mailPoetConf)

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2">
        {/* <Steps step={3} active={step} /> */}
      </div>

      {/* STEP 1 */}
      <MailPoetAuthorization
        formID={formID}
        mailPoetConf={mailPoetConf}
        setMailPoetConf={setMailPoetConf}
        step={step}
        nextPage={nextPage}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setSnackbar={setSnackbar}
      />

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%`, minHeight: step === 2 && `${200}px` }}>
        <MailPoetIntegLayout
          formID={formID}
          formFields={formFields}
          mailPoetConf={mailPoetConf}
          setMailPoetConf={setMailPoetConf}
          setSnackbar={setSnackbar}
        />
        <br />
        <br />
        <br />
        <button
          onClick={() => nextPage(3)}
          disabled={mailPoetConf.lists === '' || mailPoetConf.field_map.length < 1}
          className="btn f-right btcd-btn-lg green sh-sm flx"
          type="button"
        >
          {__('Next', 'bitform')}
          <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
        </button>
      </div>

      {/* STEP 3 */}
      <IntegrationStepThree
        step={step}
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, mailPoetConf, history)}
      />
    </div>
  )
}
