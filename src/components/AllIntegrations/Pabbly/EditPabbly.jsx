/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { lazy, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SnackMsg from '../../Utilities/SnackMsg'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import WebHooksStepTwo from '../IntegrationHelpers/WebHooksStepTwo'

const WebHooksIntegration = lazy(() => import('../IntegrationHelpers/WebHooksIntegration'))

function EditPabbly({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useNavigate()
  const { id, formID } = useParams()

  const [pabbly, setPabbly] = useState({ ...integrations[id] })
  const [snack, setSnackbar] = useState({ show: false })

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="mt-3">
        <WebHooksIntegration
          formID={formID}
          formFields={formFields}
          webHooks={pabbly}
          setWebHooks={setPabbly}
          setSnackbar={setSnackbar}
        />
      </div>

      <WebHooksStepTwo
        edit
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, pabbly, history, id, 1)}
      />
      <br />
    </div>
  )
}

export default EditPabbly
