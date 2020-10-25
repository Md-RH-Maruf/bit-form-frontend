/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import ConfirmModal from '../../ConfirmModal'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'
import Loader from '../../Loaders/Loader'
import { refreshNoteTypes } from './ZohoRecruitCommonFunc'

export default function ZohoRecruitActions({ tab, formID, formFields, recruitConf, setRecruitConf, setSnackbar }) {
  const [recOwnerMdl, setrecOwnerMdl] = useState(false)
  const [notesMdl, setNotesMdl] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const actionHandler = (val, typ) => {
    const newConf = { ...recruitConf }
    if (tab === 0) {
      if (typ === 'approval') {
        if (val.target.checked) {
          newConf.actions.approval = true
        } else {
          delete newConf.actions.approval
        }
      }
      if (typ === 'workflow') {
        if (val.target.checked) {
          newConf.actions.workflow = true
        } else {
          delete newConf.actions.workflow
        }
      }
      if (typ === 'upsert') {
        if (val.target.checked) {
          newConf.actions.upsert = true
        } else {
          delete newConf.actions.upsert
        }
      }
      if (typ === 'recordOwner') {
        if (val !== '') {
          newConf.actions.recordOwner = val
        } else {
          delete newConf.actions.recordOwner
        }
      }
    } else {
      if (typ === 'approval') {
        if (val.target.checked) {
          newConf.relatedlists[tab - 1].actions.approval = true
        } else {
          delete newConf.relatedlists[tab - 1].actions.approval
        }
      }
      if (typ === 'workflow') {
        if (val.target.checked) {
          newConf.relatedlists[tab - 1].actions.workflow = true
        } else {
          delete newConf.relatedlists[tab - 1].actions.workflow
        }
      }
      if (typ === 'recordOwner') {
        if (val !== '') {
          newConf.relatedlists[tab - 1].actions.recordOwner = val
        } else {
          delete newConf.relatedlists[tab - 1].actions.recordOwner
        }
      }
    }

    setRecruitConf({ ...newConf })
  }

  const openNotesMdl = () => {
    if (!recruitConf.default.noteTypes) {
      refreshNoteTypes(formID, recruitConf, setRecruitConf, setisLoading, setSnackbar)
    }

    setNotesMdl(true)
  }

  const handleNoteAction = (typ, val) => {
    const newConf = { ...recruitConf }
    if (!newConf.actions.note) newConf.actions.note = {}

    if (typ === 'field') {
      if (!newConf.actions.note.content) newConf.actions.note.content = ''
      newConf.actions.note.content += val
    } else if (val) newConf.actions.note[typ] = val
    else delete newConf.actions.note[typ]

    setRecruitConf({ ...newConf })
  }

  return (
    <>
      <div className="d-flx flx-wrp">
        {recruitConf?.relatedlists?.[tab - 1]?.module !== 'Notes'
          && (
            <>
              <TableCheckBox onChange={(e) => actionHandler(e, 'workflow')} checked={tab === 0 ? 'workflow' in recruitConf.actions : 'workflow' in recruitConf.relatedlists?.[tab - 1]?.actions} className="wdt-200 mt-4 mr-2" value="Workflow" title="Workflow" subTitle="Trigger workflows in Zoho Recruit." />
              <TableCheckBox onChange={(e) => actionHandler(e, 'approval')} checked={tab === 0 ? 'approval' in recruitConf.actions : 'approval' in recruitConf.relatedlists?.[tab - 1]?.actions} className="wdt-200 mt-4 mr-2" value="Approval" title="Approval" subTitle="Send entries to approval list in Zoho Recruit." />
              {(tab === 0 && !['Calls', 'Events', 'Tasks'].includes(recruitConf.module)) && (
                <>
                  <TableCheckBox onChange={(e) => actionHandler(e, 'upsert')} checked={'upsert' in recruitConf.actions} className="wdt-200 mt-4 mr-2" value="Upsert_Record" title="Upsert Record" subTitle="A record gets updated if the email already exists, else a new record will be created." />
                  <TableCheckBox onChange={openNotesMdl} checked={'note' in recruitConf.actions && 'type' in recruitConf.actions?.note} className="wdt-200 mt-4 mr-2" value="notes" title="Add a Note" subTitle="Add a note from bitform to pushed to Zoho Recruit." />
                </>
              )}
            </>
          )}
        <TableCheckBox onChange={() => setrecOwnerMdl(true)} checked={tab === 0 ? 'recordOwner' in recruitConf.actions : 'recordOwner' in recruitConf.relatedlists?.[tab - 1]?.actions} className="wdt-200 mt-4 mr-2" value="recordOwner" title="Record Owner" subTitle="Set owner of current record" />
      </div>
      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="blue"
        btnTxt="Ok"
        show={recOwnerMdl}
        close={() => setrecOwnerMdl(false)}
        action={() => setrecOwnerMdl(false)}
        title="Record Owner"
      >
        <div className="btcd-hr mt-2 mb-2" />
        <div className="mt-2">Owner ID</div>
        <div className="flx flx-between">
          <input onChange={e => actionHandler(e.target.value, 'recordOwner')} className="btcd-paper-inp mt-2" type="number" min="0" value={tab === 0 ? (recruitConf?.actions?.recordOwner || '') : (recruitConf.relatedlists?.[tab - 1]?.actions?.recordOwner || '')} placeholder="Enter Owner ID" />
        </div>

      </ConfirmModal>

      {tab === 0
        && (
          <ConfirmModal
            className="custom-conf-mdl"
            mainMdlCls="o-v"
            btnClass="blue"
            btnTxt="Ok"
            show={notesMdl}
            close={() => setNotesMdl(false)}
            action={() => setNotesMdl(false)}
            title="Notes"
          >
            <div className="btcd-hr mt-2 mb-2" />

            {isLoading
              ? (
                <Loader style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 45,
                  transform: 'scale(0.5)',
                }}
                />
              )
              : (
                <>
                  <div className="flx">
                    <select className="btcd-paper-inp" onChange={e => handleNoteAction('type', e.target.value)} value={recruitConf.actions?.note?.type || ''}>
                      <option value="">Select Note Type</option>
                      {recruitConf?.default?.noteTypes && Object.values(recruitConf.default.noteTypes).map(noteTypes => <option key={noteTypes.noteTypeId} value={`${noteTypes.noteTypeId}__${noteTypes.noteTypeName}`}>{noteTypes.noteTypeName}</option>)}
                    </select>
                    <button onClick={() => refreshNoteTypes(formID, recruitConf, setRecruitConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Note Types"' }} type="button" disabled={isLoading}>&#x21BB;</button>
                  </div>
                  <div className="mt-2 mb-1">Note Content</div>
                  <select className="btcd-paper-inp w-5" onChange={e => handleNoteAction('field', e.target.value)}>
                    <option value="">Field</option>
                    {formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={`\${${f.key}}`}>{f.name}</option>)}
                  </select>
                  <textarea rows="5" className="btcd-paper-inp mt-2" onChange={e => handleNoteAction('content', e.target.value)} value={recruitConf.actions?.note?.content || ''} />
                </>
              )}
          </ConfirmModal>
        )}
    </>
  )
}
