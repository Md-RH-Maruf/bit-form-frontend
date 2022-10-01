import { useState } from 'react'
import { useFela } from 'react-fela'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useNavigate, useParams } from 'react-router-dom'
import BackIcn from '../../../Icons/BackIcn'
import ut from '../../../styles/2.utilities'
import app from '../../../styles/app.style'
import { __ } from '../../../Utils/i18nwrap'
import Btn from '../../Utilities/Btn'
import SnackMsg from '../../Utilities/SnackMsg'
import Steps from '../../Utilities/Steps'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import AutonamiAuthorization from './AutonamiAuthorization'
import { checkMappedFields, getAutonamiFields } from './AutonamiCommonFunc'
import AutonamiIntegLayout from './AutonamiIntegLayout'

export default function Autonami({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useNavigate()
  const { formID } = useParams()
  const { css } = useFela()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const [autonamiConf, setAutonamiConf] = useState({
    name: 'Autonami API',
    type: 'Autonami',
    field_map: [
      { formField: '', autonamiField: '' },
    ],
    actions: {},
  })

  const nextPage = (val) => {
    if (val === 2 && autonamiConf.name !== '') {
      getAutonamiFields(autonamiConf, setAutonamiConf, setIsLoading, setSnackbar)
      setStep(val)
    } else if (val === 3) {
      if (!checkMappedFields(autonamiConf)) {
        setSnackbar({ show: true, msg: 'Please map all required fields to continue.' })
        return
      }
      if (autonamiConf.field_map.length > 0) {
        setStep(val)
      }
    }

    document.getElementById('btcd-settings-wrp').scrollTop = 0
  }

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2">
        <Steps step={3} active={step} />
      </div>

      {/* STEP 1 */}
      <AutonamiAuthorization
        formID={formID}
        autonamiConf={autonamiConf}
        setAutonamiConf={setAutonamiConf}
        step={step}
        nextPage={nextPage}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setSnackbar={setSnackbar}
      />

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%`, minHeight: step === 2 && `${200}px` }}>
        <AutonamiIntegLayout
          formID={formID}
          formFields={formFields}
          autonamiConf={autonamiConf}
          setAutonamiConf={setAutonamiConf}
          setIsLoading={setIsLoading}
          setSnackbar={setSnackbar}
        />
        <br />
        <br />
        <br />
        <Btn
          onClick={() => nextPage(3)}
          disabled={autonamiConf.field_map.length < 1}
          className={css(ut.ftRight)}
        >
          {__('Next')}
          <BackIcn className="ml-1 rev-icn" />
        </Btn>
      </div>

      {/* STEP 3 */}
      <IntegrationStepThree
        step={step}
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, autonamiConf, history)}
      />
    </div>
  )
}
