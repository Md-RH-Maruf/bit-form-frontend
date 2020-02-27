import React, { useState, useEffect, useRef } from 'react'
import Modal from './Modal'
import bitsFetch from '../Utils/bitsFetch'
import Bitapps from '../user-frontend/Bitapps.jsx'

export default function EditEntryData(props) {
  console.log('%c $render EditEntryData', 'background:#ff8686;padding:3px;border-radius:5px')

  const [showEdit, setshowEdit] = useState(false)
  const [data, setData] = useState({ layout: null, fields: null })

  const ref = useRef(null)

  useEffect(() => {
    setshowEdit(true)
    bitsFetch({ formID: props.formID, entryID: props.entryID }, 'bitapps_edit_form_entry')
      .then(res => {
        if (res !== undefined && res.success) {
          setData({ layout: res.data.layout, fields: res.data.fields })
          console.log('data res', res.data)
        }
      })
  }, [])

  const updateData = (event) => {
    event.preventDefault()
    const formData = new FormData(ref.current)
    const fields = Array.prototype.slice.call(event.target)
    // eslint-disable-next-line array-callback-return
    fields.filter(el => {
      if (el.type === 'file' && el.files.length > 0) {
        if (el.files.length > 1) {
          el.files.forEach(file => formData.append(`${el.name}[]`, file))
        } else {
          el.files.forEach(file => formData.append(el.name, file))
        }
      } else if ((el.type === 'checkbox' || el.type === 'radio') && el.checked) {
        formData.append(el.name, el.value)
      } else if (el.type === 'select') {
        formData.append(el.name, el.value)
      } else if (!(el.type === 'checkbox' || el.type === 'radio' || el.type === 'file' || el.type === 'select')) {
        formData.append(el.name, el.value)
      }
    })
    console.clear()
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    bitsFetch(formData, 'bitapps_update_form_entry', 'multipart/form-data')
      .then(response => {
        if (response !== undefined && response.success) {
          setMessage(response.data.message)
          setSnack(true)
          // window.location = '/'
        }
      })
  }

  function SaveBtn() {
    return (
      <button onClick={updateData} type="button" className="btn btn-md blue btcd-mdl-hdr-btn">Update</button>
    )
  }

  return (
    <Modal
      hdrActn={<SaveBtn />}
      lg
      show={showEdit}
      setModal={props.close}
      title="Edit"
    >
      <div style={{ overflow: 'auto' }}>
        {data.layout !== null && (
          <Bitapps
            refer={ref}
            editMode
            layout={data.layout}
            data={data.fields}
          />
        )}
      </div>
    </Modal>
  )
}
