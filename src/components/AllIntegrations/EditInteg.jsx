import React from 'react'
import { useParams, Link } from 'react-router-dom'
import EditZohoCRM from './ZohoCRM/EditZohoCRM'
import EditZohoRecruit from './ZohoRecruit/EditZohoRecruit'
import EditZohoAnalytics from './ZohoAnalytics/EditZohoAnalytics'
import EditZohoCampaigns from './ZohoCampaigns/EditZohoCampaigns'
import EditZohoDesk from './ZohoDesk/EditZohoDesk'
import EditZohoWorkDrive from './ZohoWorkDrive/EditZohoWorkDrive'

function EditInteg({ allIntegURL, formFields, setIntegration, integrations }) {
  const { id } = useParams()
  const IntegType = () => {
    switch (integrations[id].type) {
      case 'Zoho CRM':
        return <EditZohoCRM allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Recruit':
        return <EditZohoRecruit allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Analytics':
        return <EditZohoAnalytics allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Campaigns':
        return <EditZohoCampaigns allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho Desk':
        return <EditZohoDesk allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      case 'Zoho WorkDrive':
        return <EditZohoWorkDrive allIntegURL={allIntegURL} formFields={formFields} integrations={integrations} setIntegration={setIntegration} />
      default:
        break;
    }
    return ''
  }

  return (
    <div>
      <div className="flx">
        <Link to={allIntegURL} className="btn btcd-btn-o-gray">
          <span className="btcd-icn icn-chevron-left" />
          &nbsp;Back
        </Link>
        <div className="w-8 txt-center">
          <b className="f-lg">{integrations[id].type}</b>
          <div>Integration Settings</div>
        </div>
      </div>
      <IntegType />
    </div>
  )
}

export default EditInteg
