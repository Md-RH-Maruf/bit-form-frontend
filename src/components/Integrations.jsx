import { useState } from 'react';
import { Link, Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom'
import zohoAnalytics from '../resource/img/integ/analytics.svg'
import zohoCamp from '../resource/img/integ/campaigns.svg'
import zohoCreator from '../resource/img/integ/creator.svg'
import zohoCRM from '../resource/img/integ/crm.svg'
import zohoDesk from '../resource/img/integ/desk.svg'
import zohoHub from '../resource/img/integ/hub.svg'
import zohoMail from '../resource/img/integ/mail.svg'
import zohoPeople from '../resource/img/integ/people.svg'
import zohoProjects from '../resource/img/integ/projects.svg'
import zohoRecruit from '../resource/img/integ/recruit.svg'
import zohoSheet from '../resource/img/integ/sheet.svg'
import zohoWorkdrive from '../resource/img/integ/workdrive.svg'
import bitsFetch from '../Utils/bitsFetch'
import EditInteg from './AllIntegrations/EditInteg'
import IntegInfo from './AllIntegrations/IntegInfo'
import NewInteg from './AllIntegrations/NewInteg'
import ConfirmModal from './ConfirmModal'
import SnackMsg from './ElmSettings/Childs/SnackMsg'
import Modal from './Modal'

function Integrations({ integrations, setIntegration, formFields }) {
  const [showMdl, setShowMdl] = useState(false)
  const [confMdl, setconfMdl] = useState({ show: false })
  const [snack, setSnackbar] = useState({ show: false })
  const { path, url } = useRouteMatch()
  const allIntegURL = url
  const history = useHistory()
  const { formID } = useParams()
  /* eslint-disable-next-line no-undef */
  const isPro = typeof bits !== 'undefined' && bits.isPro

  const integs = [
    { type: 'Zoho CRM', logo: zohoCRM },
    { type: 'Zoho Recruit', logo: zohoRecruit, pro: !isPro },
    { type: 'Zoho Analytics', logo: zohoAnalytics, pro: !isPro },
    { type: 'Zoho Campaigns', logo: zohoCamp, pro: !isPro },
    { type: 'Zoho WorkDrive', logo: zohoWorkdrive, pro: !isPro },
    { type: 'Zoho Desk', logo: zohoDesk, pro: !isPro },
    { type: 'Zoho Mail', logo: zohoMail, pro: !isPro },
    { type: 'Zoho Sheet', logo: zohoSheet, pro: !isPro },
    { type: 'Zoho Projects', logo: zohoProjects, pro: !isPro },
    { type: 'Zoho Sign', logo: '', pro: !isPro },
    { type: 'Zoho Marketing Hub', logo: zohoHub, pro: !isPro },
    { type: 'Zoho Creator', logo: zohoCreator, pro: !isPro },
    { type: 'Zoho People', logo: zohoPeople, pro: !isPro, disable: true },
  ]

  const removeInteg = i => {
    const tempIntegration = { ...integrations[i] }
    const newInteg = [...integrations]
    newInteg.splice(i, 1)
    setIntegration(newInteg)
    bitsFetch({ formID, id: tempIntegration.id }, 'bitforms_delete_form_integration')
      .then(response => {
        if (response && response.success) {
          setSnackbar({ show: true, msg: `${response.data.message}` })
        } else if (response && response.data && response.data.data) {
          newInteg.splice(i, 0, tempIntegration)
          setIntegration([...newInteg])
          setSnackbar({ show: true, msg: `Integration deletion failed Cause:${response.data.data}. please try again` })
        } else {
          newInteg.splice(i, 0, tempIntegration)
          setIntegration([...newInteg])
          setSnackbar({ show: true, msg: 'Integration deletion failed. please try again' })
        }
      })
  }

  const inteDelConf = i => {
    confMdl.btnTxt = 'Delete'
    confMdl.body = 'Are you sure to delete this integration?'
    confMdl.btnClass = ''
    confMdl.action = () => { removeInteg(i); closeConfMdl() }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const getLogo = type => {
    for (let i = 0; i < integs.length; i += 1) {
      if (integs[i].type === type) {
        return <img src={integs[i].logo} alt={type} />
      }
    }
    return null
  }

  const setNewInteg = (type) => {
    setShowMdl(false)
    history.push(`${allIntegURL}/new/${type}`)
  }

  const closeConfMdl = () => {
    confMdl.show = false
    setconfMdl({ ...confMdl })
  }

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <ConfirmModal
        show={confMdl.show}
        close={closeConfMdl}
        btnTxt={confMdl.btnTxt}
        btnClass={confMdl.btnClass}
        body={confMdl.body}
        action={confMdl.action}
      />
      <Switch>
        <Route exact path={path}>
          <h2>Integrations</h2>
          <div className="flx flx-wrp">
            <Modal
              title="Available Integrations"
              show={showMdl}
              setModal={setShowMdl}
              style={{ width: 1000 }}
            >
              <div className="flx flx-wrp btcd-inte-wrp">
                {integs.map((inte, i) => (
                  <div
                    key={`inte-sm-${i + 2}`}
                    onClick={() => !inte.disable && !inte.pro && setNewInteg(inte.type)}
                    onKeyPress={() => !inte.disable && !inte.pro && setNewInteg(inte.type)}
                    role="button"
                    tabIndex="0"
                    className={`btcd-inte-card inte-sm mr-4 mt-3 ${inte.disable && !inte.pro && 'btcd-inte-dis'} ${inte.pro && 'btcd-inte-pro'}`}
                  >
                    {inte.pro && (
                      <div className="pro-filter">
                        <span className="txt-pro"><a href="https://bitpress.pro/" target="_blank" rel="noreferrer">Premium</a></span>
                      </div>
                    )}
                    <img src={inte.logo} alt="" />
                    <div className="txt-center">
                      {inte.type}
                    </div>
                  </div>
                ))}
              </div>
            </Modal>

            <div role="button" className="btcd-inte-card flx flx-center add-inte mr-4 mt-3" tabIndex="0" onClick={() => setShowMdl(true)} onKeyPress={() => setShowMdl(true)}>
              <div>+</div>
            </div>

            {integrations.map((inte, i) => (
              <div role="button" className="btcd-inte-card mr-4 mt-3" key={`inte-${i + 3}`}>
                {getLogo(inte.type)}
                <div className="btcd-inte-atn txt-center">
                  <Link to={`${allIntegURL}/edit/${i}`} className="btn btcd-btn-o-blue btcd-btn-sm mr-2 tooltip pos-rel" style={{ '--tooltip-txt': '"Edit"' }} type="button">
                    <span className="btcd-icn icn-edit" />
                  </Link>
                  <button className="btn btcd-btn-o-blue btcd-btn-sm mr-2 tooltip pos-rel" style={{ '--tooltip-txt': '"Delete"' }} onClick={() => inteDelConf(i)} type="button">
                    <span className="btcd-icn icn-trash-2" />
                  </button>
                  <Link to={`${allIntegURL}/info/${i}`} className="btn btcd-btn-o-blue btcd-btn-sm tooltip pos-rel" style={{ '--tooltip-txt': '"Info"' }} type="button">
                    <span className="btcd-icn icn-information-outline" />
                  </Link>
                </div>
                <div className="txt-center body" title={`${inte.name} | ${inte.type}`}>
                  <div>{inte.name}</div>
                  <small className="txt-dp">{inte.type}</small>
                </div>
              </div>
            ))}
          </div>
        </Route>
        <Route path={`${path}/new/:type`}>
          <NewInteg allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
        </Route>
        {integrations && integrations.length > 0
          && (
            <Route exact path={`${path}/edit/:id`}>
              <EditInteg allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
            </Route>
          )}
        {integrations && integrations.length > 0
          && (
            <Route exact path={`${path}/info/:id`}>
              <IntegInfo allIntegURL={allIntegURL} integrations={integrations} />
            </Route>
          )}
      </Switch>

    </div>
  )
}

export default Integrations
