/* eslint-disable no-unused-expressions */
import { useState } from 'react'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'
import { __ } from '../../../Utils/i18nwrap'
import SnackMsg from '../../Utilities/SnackMsg'
import Steps from '../../Utilities/Steps'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import ElasticEmailAuthorization from './ElasticEmailAuthorization'
import { checkMappedFields, handleInput } from './ElasticEmailCommonFunc'
import ElasticEmailIntegLayout from './ElasticEmailIntegLayout'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'

function ElasticEmail({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const fields = [
    { key: 'Email', label: 'Email', required: true },
    { key: 'FirstName', label: 'FirstName', required: false },
    { key: 'LastName', label: 'LastName', required: false },
  ]
  const [elasticEmailConf, setElasticEmailConf] = useState({
    name: 'ElasticEmail',
    type: 'ElasticEmail',
    api_key: process.env.NODE_ENV === 'development' ? 'DF6A741BBBEC44CC01C0BC9FE998BC6BAA1CF1A5A8638EE6AB2117814ADA5B3647F15209D0BC0A61EE99C803956B85D6' : '',
    field_map: [
      { formField: '', elasticEmailField: '' },
    ],
    actions: {},
    elasticEmailFields: fields,
  })

  const saveConfig = () => {
    saveIntegConfig(integrations, setIntegration, allIntegURL, elasticEmailConf, history)

  }
  const nextPage = (pageNo) => {
    if (!checkMappedFields(elasticEmailConf)) {
      // setSnackbar({ show: true, msg: __('Please map mandatory fields', 'bitform') })
      toast.error('Please map mandatory fields')
      return
    }
    elasticEmailConf.field_map.length > 0 && setstep(pageNo)
  }
  document.querySelector('.btcd-s-wrp').scrollTop = 0

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}

      <ElasticEmailAuthorization
        elasticEmailConf={elasticEmailConf}
        setElasticEmailConf={setElasticEmailConf}
        step={step}
        setstep={setstep}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ ...(step === 2 && { width: 900, height: 'auto', overflow: 'visible' }) }}>

        <ElasticEmailIntegLayout
          formFields={formFields}
          handleInput={(e) => handleInput(e, elasticEmailConf, setElasticEmailConf, setIsLoading)}
          elasticEmailConf={elasticEmailConf}
          setElasticEmailConf={setElasticEmailConf}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

        <button
          onClick={() => nextPage(3)}
          className="btn f-right btcd-btn-lg green sh-sm flx"
          type="button"
        >
          {__('Next', 'bitform')}
          {' '}
          &nbsp;
          <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
        </button>
      </div>

      {/* STEP 3 */}
      <IntegrationStepThree
        step={step}
        saveConfig={() => saveConfig()}
      />
    </div>
  )
}

export default ElasticEmail
