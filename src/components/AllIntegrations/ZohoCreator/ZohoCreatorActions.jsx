/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react'
import CheckBox from '../../ElmSettings/Childs/CheckBox'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'
import Modal from '../../Modal'
import TitleModal from '../../TitleModal'

export default function ZohoCreatorActions({ creatorConf, setCreatorConf }) {
  const [updateMdl, setUpdateMdl] = useState(false)

  const actionHandler = (val, typ) => {
    const newConf = { ...creatorConf }
    if (typ === 'update') {
      if (val.target.checked && !newConf?.actions?.update) {
        newConf.actions.update = { insert: true, criteria: '' }
        setUpdateMdl(true)
      } else {
        delete newConf.actions.update
      }
    }

    setCreatorConf({ ...newConf })
  }

  const setUpdateSettings = (val, typ) => {
    const newConf = { ...creatorConf }
    if (typ === 'criteria') {
      newConf.actions.update.criteria = val
    }
    if (typ === 'insert') {
      newConf.actions.update.insert = val
    }
    setCreatorConf({ ...newConf })
  }

  const openUpdateModal = () => {
    if (!creatorConf.actions?.update) {
      const newConf = { ...creatorConf }
      newConf.actions.update = { insert: true, criteria: '' }
      setCreatorConf({ ...newConf })
    }

    setUpdateMdl(true)
  }

  useEffect(() => {
    if (!updateMdl && !creatorConf.actions?.update?.criteria) {
      const newConf = { ...creatorConf }
      delete newConf.actions.update
      setCreatorConf({ ...newConf })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMdl])

  return (
    <div className="pos-rel">
      <div className="d-flx flx-wrp">
        <TitleModal action={openUpdateModal}>
          <TableCheckBox onChange={(e) => actionHandler(e, 'update')} checked={'update' in creatorConf?.actions} className="wdt-200 mt-4 mr-2" value="Upsert_Record" title="Update Record" subTitle="Control how the record gets updated." />
        </TitleModal>
      </div>

      <Modal
        md
        show={updateMdl}
        setModal={setUpdateMdl}
        title="Update Row"
      >
        <div className="o-a">
          {creatorConf?.actions?.update && (
            <>
              <small>Enter the criteria to update records. Please use the below format.</small>
              <br />
              <div className="mt-4">
                <small>
                  Example:&nbsp;
                  {'("Status"==\\"Finance\\"&&"Total>=250.43")'}
                </small>
                <br />
                <br />
                <small>
                  Here Status, Total are Zoho Creator Field link name. info:
                  {' '}
                  <a href="https://www.zoho.com/creator/help/api/v2/update-records.html" target="_blank" rel="noreferrer">Zoho Creator Criteria Guide</a>
                </small>
                <textarea name="" rows="5" className="btcd-paper-inp mt-1" onChange={e => setUpdateSettings(e.target.value, 'criteria')} value={creatorConf.actions?.update?.criteria} />
              </div>

              <div className="font-w-m mt-3">Update Preferance</div>
              <small>insert new record if the above criteria doesn&apos;t met?</small>
              <div>
                <CheckBox onChange={() => setUpdateSettings(true, 'insert')} radio checked={creatorConf.actions.update?.insert} name="up-row" title="Yes" />
                <CheckBox onChange={() => setUpdateSettings(false, 'insert')} radio checked={!creatorConf.actions.update?.insert} name="up-row" title="No" />
              </div>
            </>
          )}
        </div>
      </Modal>

    </div>
  )
}
