import React, { useState } from 'react'
import { Link, Switch, Route, useRouteMatch, useHistory, useParams } from 'react-router-dom'
import Modal from './Modal'
import zohoAnalytics from '../resource/img/integ/zohoAnalytics.png'
import zohoDesk from '../resource/img/integ/zohoDesk.png'
import zohoCRM from '../resource/img/integ/zohoCRM.png'
import zohoRecruit from '../resource/img/integ/zohoRecruit.png'
import zohoCamp from '../resource/img/integ/zohoCamp.png'
import zohoHub from '../resource/img/integ/zohoHub.png'
import zohoCreator from '../resource/img/integ/zohoCreator.png'
import zohoProjects from '../resource/img/integ/zohoProjects.png'
import zohoPeople from '../resource/img/integ/zohoPeople.png'
import NewInteg from './AllIntegrations/NewInteg'
import EditInteg from './AllIntegrations/EditInteg'
import ConfirmModal from './ConfirmModal'
import bitsFetch from '../Utils/bitsFetch'
import SnackMsg from './ElmSettings/Childs/SnackMsg'

function Integrations({ integrations, setIntegration, formFields }) {
  const [showMdl, setShowMdl] = useState(false)
  const [confMdl, setconfMdl] = useState({ show: false })
  const [snack, setSnackbar] = useState({ show: false })
  const { path, url } = useRouteMatch()
  const history = useHistory()
  const { formID } = useParams()
  const integs = [
    { type: 'Zoho CRM', logo: zohoCRM },
    { type: 'Zoho Marketing Hub', logo: zohoHub, disable: true },
    { type: 'Zoho Campaigns', logo: zohoCamp, disable: true },
    { type: 'Zoho Recruit', logo: zohoRecruit, disable: true },
    { type: 'Zoho Analytics', logo: zohoAnalytics, disable: true },
    { type: 'Zoho Desk', logo: zohoDesk, disable: true },
    { type: 'Zoho Creator', logo: zohoCreator, disable: true },
    { type: 'Zoho Projects', logo: zohoProjects, disable: true },
    { type: 'Zoho People', logo: zohoPeople, disable: true },
  ]

  const removeInteg = i => {
    console.log('i', integrations[i])
    const tempIntegration = integrations[i]
    integrations.splice(i, 1)
    setIntegration([...integrations])
    bitsFetch({ formID, id: tempIntegration.id }, 'bitforms_delete_form_integration')
      .then(response => {
        if (response && response.success) {
          setSnackbar({ show: true, msg: `${response.data.message}` })
        } else if (response && response.data && response.data.data) {
          integrations.splice(i, 0, tempIntegration)
          setIntegration([...integrations])
          setSnackbar({ show: true, msg: `Integration deletion failed Cause:${response.data.data}. please try again` })
        } else {
          integrations.splice(i, 0, tempIntegration)
          setIntegration([...integrations])
          setSnackbar({ show: true, msg: 'Integration deletion failed. please try again' })
        }

      })
  }

  const inteDelConf = i => {
    confMdl.btnTxt = 'Delete'
    confMdl.body = 'Are you sure to delete this template'
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
    history.push(`${url}/new/${type}`)
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
            >
              <div className="flx flx-wrp">
                {integs.map((inte, i) => (
                  <div onClick={() => setNewInteg(inte.type)} onKeyPress={() => setNewInteg(inte.type)} role="button" tabIndex="0" className={`btcd-inte-card inte-sm mr-4 mt-3 ${inte.disable && 'btcd-inte-dis'}`} key={`inte-sm-${i + 2}`}>
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
                  <Link to={`${url}/edit/${i}`} className="btn btcd-btn-o-blue btcd-btn-sm mr-2" type="button">
                    <div>
                      <span className="btcd-icn icn-edit" />
                       &nbsp;Edit
                    </div>
                  </Link>
                  <button className="btn btcd-btn-o-blue btcd-btn-sm" onClick={() => inteDelConf(i)} type="button">
                    <div>
                      <span className="btcd-icn icn-trash-2" />
                        &nbsp;Delete
                    </div>
                  </button>
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
          <NewInteg url={url} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
        </Route>
        {integrations && integrations.length > 0
          && (
            <Route exact path={`${path}/edit/:id`}>
              <EditInteg url={url} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
            </Route>
          )}
      </Switch>

    </div>
  )
}

export default Integrations
