import { useEffect, useState } from 'react'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useNavigate, useParams } from 'react-router-dom'
import SnackMsg from '../../Utilities/SnackMsg'
import Steps from '../../Utilities/Steps'
import { saveIntegConfig, setGrantTokenResponse } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import NextBtn from '../NextBtn'
import ZohoBiginAuthorization from './ZohoBiginAuthorization'
import { handleInput } from './ZohoBiginCommonFunc'
import ZohoBiginIntegLayout from './ZohoBiginIntegLayout'

function ZohoBigin({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useNavigate()
  const { formID } = useParams()
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const [tab, settab] = useState(0)
  // const scopes = 'ZohoBigin.settings.modules.READ,ZohoBigin.settings.fields.READ,ZohoBigin.settings.tags.READ,ZohoBigin.users.READ,ZohoBigin.modules.ALL'
  const [biginConf, setBiginConf] = useState({
    name: 'Zoho Bigin API',
    type: 'Zoho Bigin',
    clientId: process.env.NODE_ENV === 'development' ? '1000.CV9SFKPGAJPZUUALBNE364K7X4A1WX' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? '0ca5298ffd1ea6017b63076e3d18a1ae79fb0993ed' : '',
    module: '',
    field_map: [
      { formField: '', zohoFormField: '' },
    ],
    relatedlists: [],
    actions: {},
  })

  useEffect(() => {
    window.opener && setGrantTokenResponse('zohoBigin')
  }, [])

  const nextPage = () => {
    setTimeout(() => {
      document.getElementById('btcd-settings-wrp').scrollTop = 0
    }, 300)
    if (biginConf.module !== '' && biginConf.field_map.length > 0) {
      setstep(3)
    }
  }

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2 cal-width"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <ZohoBiginAuthorization
        formID={formID}
        biginConf={biginConf}
        setBiginConf={setBiginConf}
        step={step}
        setstep={setstep}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setSnackbar={setSnackbar}
      />

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%` }}>

        <ZohoBiginIntegLayout
          tab={tab}
          settab={settab}
          formID={formID}
          formFields={formFields}
          handleInput={(e) => handleInput(e, tab, biginConf, setBiginConf, formID, setisLoading, setSnackbar)}
          biginConf={biginConf}
          setBiginConf={setBiginConf}
          isLoading={isLoading}
          setisLoading={setisLoading}
          setSnackbar={setSnackbar}
        />

        <NextBtn
          nextPageHandler={() => nextPage(3)}
        />
      </div>

      {/* STEP 3 */}
      <IntegrationStepThree
        step={step}
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, biginConf, history)}
      />
    </div>
  )
}

export default ZohoBigin
