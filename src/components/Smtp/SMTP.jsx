/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { $bits } from '../../GlobalStates/GlobalStates'
import bitsFetch from '../../Utils/bitsFetch'
import { __ } from '../../Utils/i18nwrap'
import SMTPConfigForm from './SMTPConfigForm'
import MailSendTest from './MailSendTest'

export default function SMTP({ setsnack }) {
  const bits = useRecoilValue($bits)
  const { isPro } = bits
  const [mail, setMail] = useState({})
  const [status, setStatus] = useState('')

  useEffect(() => {
    bitsFetch({ formID: 0 }, 'bitforms_get_mail_config').then((res) => {
      if (res?.success) {
        if (!res.data.errors) {
          setMail(JSON.parse(res.data[0].integration_details))
          setStatus(Number(res.data[0].status))
        }
      }
    })
  }, [])

  return (
    <div className="btcd-captcha w-5" style={{ padding: 10 }}>
      <div className="pos-rel">
        <Tabs
          selectedTabClassName="s-t-l-active"
        >
          <TabList className="flx">
            <Tab className="btcd-s-tab-link">
              <b>{__('Configuration')}</b>
            </Tab>
            <Tab className="btcd-s-tab-link">
              <b>{__('Mail Test')}</b>
            </Tab>
          </TabList>
          <TabPanel>
            <SMTPConfigForm
              mail={mail}
              setMail={setMail}
              status={status}
              smtpStatus={setStatus}
            />
          </TabPanel>
          <TabPanel>
            <MailSendTest />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}
