/* eslint-disable no-undef */
/* import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable' */
import React from 'react'
import ReactDOM from 'react-dom'
import Bitforms from './Bitforms'

if (! window._babelPolyfill) {
  require('babel-polyfill');
}
export default function BitformsRenderer(params) {
  const noJS = document.getElementById(`${params.contentID}no-js`)
  if (noJS) {
    noJS.innerHTML = ''
  }
  /* if (params.gCaptchaSiteKey !== null) {
    grecaptcha.ready(() => {
      console.log('gCaptchaSiteKey', params.gCaptchaSiteKey)
      grecaptcha.execute(params.gCaptchaSiteKey, { action: 'homepage' }).then((token) => {
        console.log('gCaptchaSiteKey', token)
      })
    })
  } */
  // eslint-disable-next-line react/jsx-filename-extension
  ReactDOM.render(<Bitforms
    buttons={params.buttons}
    data={params.fields}
    layout={params.layout}
    file={params.file}
    gRecaptchaSiteKey={params.gRecaptchaSiteKey}
    gRecaptchaVersion={params.gRecaptchaVersion}
    fieldToCheck={params.fieldToCheck}
    fieldToChange={params.fieldToChange}
    conditional={params.conditional}
    fieldsKey={params.fieldsKey}
    contentID={params.contentID}
    appID={params.appID}
    nonce={params.nonce}
  />, document.getElementById(params.contentID));
}
