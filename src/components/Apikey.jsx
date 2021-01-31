// eslint-disable-next-line import/no-extraneous-dependencies
import { useState, useEffect } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import bitsFetch from '../Utils/bitsFetch'
import LoaderSm from './Loaders/LoaderSm'
import SnackMsg from './ElmSettings/Childs/SnackMsg'
import CopyText from './ElmSettings/Childs/CopyText'

const randomKey = length => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export default function Apikey() {
  const [key, setKey] = useState('')
  const [snack, setsnack] = useState({ show: false })
  const [isLoading, setisLoading] = useState(false)

  const handleSubmit = e => {
    setisLoading(true)
    bitsFetch({ api_key: key }, 'bitforms_api_key').then((res) => {
      if (res !== undefined && res.success) {
          setKey(res.data)
          setsnack({ ...{ show: true, msg: __('api key save successfully', 'bitform') } })
        }
        setisLoading(false)
    })
   }

  const changeKey = () => {
    setKey(randomKey(40))
  }

  useEffect(() => {
    bitsFetch({ }, 'bitforms_api_key').then((res) => {
      if (res !== undefined && res.success) {
        if (res.data) {
          setKey(res.data)
        }
      }
    })
  }, [])

  return (
    <div className="btcd-captcha w-5">
      <SnackMsg snack={snack} setSnackbar={setsnack} />
      <h2>{__('Api Secret Key', 'bitform')}</h2>
      <br />
      <br />
      <div className="btcd-hr" />

      <div className="mt-2">
        <label htmlFor="captcha-key">
          {__('Api Key', 'bitform')}
          <CopyText value={key} name="siteKey" setSnackbar={setsnack} className="field-key-cpy w-12 ml-0" readOnly />
          <a className="btcd-link" onClick={changeKey}>{__('change', 'bitform')}</a>
        </label>
      </div>
      <button type="button" onClick={(e) => handleSubmit(e)} className="btn btn-md f-right blue" disabled={isLoading}>
        {__('Save', 'bitform')}
        {isLoading && <LoaderSm size="20" clr="#fff" className="ml-2" />}
      </button>
    </div>
  )
}
