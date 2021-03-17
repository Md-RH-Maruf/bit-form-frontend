import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { __ } from '../../../Utils/i18nwrap'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Steps from '../../ElmSettings/Childs/Steps'
import { saveIntegConfig, setGrantTokenResponse } from '../IntegrationHelpers/GoogleIntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import GoogleSheetIntegLayout from './GoogleSheetIntegLayout'
import GoogleSheetAuthorization from './GoogleSheetAuthorization'
import { handleInput } from './GoogleSheetCommonFunc';

function GoogleSheet({ formFields, setIntegration, integrations, allIntegURL }) {
  console.log('google sheet')
  const history = useHistory()
  const { formID } = useParams()
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const [sheetConf, setSheetConf] = useState({
    name: 'Google Sheet API',
    type: 'Google Sheet',
    clientId: process.env.NODE_ENV === 'development' ? '937096431638-sk2jfc24vb8fevgjei524bknbvgn2g8v.apps.googleusercontent.com' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? '4J6Yk2JBcCd71Pz7XxIIm__P' : '',
    spreadsheetId: '',
    worksheetName: '',
    field_map: [
      { formField: '', googleSheetField: '' },
    ],
    header: 'ROWS',
    headerRow: 'A1',
    actions: {},
  })

  console.log('sheetConf', sheetConf)

  useEffect(() => {
    window.opener && setGrantTokenResponse('googleSheet')
  }, [])

  // const nextPage = val => {
  //   if (val === 3) {
  //     if (sheetConf.spreadsheetId !== '' && sheetConf.worksheetName !== '' && sheetConf.field_map.length > 0) {
  //       setstep(val)
  //     }
  //   } else {
  //     setstep(val)
  //     if (val === 2 && !sheetConf.spreadsheetId) {
  //       refreshSpreadsheets(formID, sheetConf, setSheetConf, setisLoading, setSnackbar)
  //     }
  //   }

  //   document.querySelector('.btcd-s-wrp').scrollTop = 0
  // }
  const nextPage = () => {
    if (sheetConf.spreadsheetId !== '' && sheetConf.worksheetName !== '' && sheetConf.field_map.length > 0) {
      setstep(3)
    }
  }
  document.querySelector('.btcd-s-wrp').scrollTop = 0

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <GoogleSheetAuthorization
        formID={formID}
        sheetConf={sheetConf}
        setSheetConf={setSheetConf}
        step={step}
        setstep={setstep}
        setSnackbar={setSnackbar}
        isLoading={isLoading}
        setisLoading={setisLoading}
      />

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%` }}>

        <GoogleSheetIntegLayout
          formID={formID}
          formFields={formFields}
          handleInput={(e) => handleInput(e, sheetConf, setSheetConf, formID, setisLoading, setSnackbar)}
          sheetConf={sheetConf}
          setSheetConf={setSheetConf}
          isLoading={isLoading}
          setisLoading={setisLoading}
          setSnackbar={setSnackbar}
        />
        {/* {console.log(sheetConf.spreadsheetId, sheetConf.worksheetName, sheetConf.field_map)} */}
        <button
          onClick={() => nextPage(3)}
          disabled={!sheetConf.spreadsheetId || !sheetConf.worksheetName || sheetConf.field_map.length < 1}
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
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, sheetConf, history)}
      />
    </div>
  )
}

export default GoogleSheet
