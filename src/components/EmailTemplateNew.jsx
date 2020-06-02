/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react'
import { NavLink, useParams, useHistory } from 'react-router-dom'

function EmailTemplateEdit({ mailTem, setMailTem, formFields, saveForm }) {
  console.log('%c $render EmailTemplateEdit', 'background:purple;padding:3px;border-radius:5px;color:white')

  const [tem, setTem] = useState({ title: 'New Template', sub: 'Email Subject', body: 'Email Body' })

  const { formType, formID, id } = useParams()
  const history = useHistory()

  const handleBody = val => {
    tem.body = val
    setTem({ ...tem })
  }

  useEffect(() => {
    if (typeof tinymce !== 'undefined' && formFields.length > 0) {
      const s = document.querySelectorAll('.form-fields-em')
      for (let i = 0; i < s.length; i += 1) {
        s[i].style.display = 'none'
      }
      // eslint-disable-next-line no-undef
      tinymce.init({
        // mode: "exact",
        // elements: 'pre-details',
        // statusbar: false,
        // skin: 'lightgray',
        selector: '.btcd-editor',
        plugins: 'link hr lists wpview wpemoji',
        theme: 'modern',
        menubar: false,
        branding: false,
        resize: 'verticle',
        min_width: 300,
        toolbar: 'formatselect bold italic |  alignleft aligncenter alignright | outdent indent | link | undo redo | hr | addFormField ',
        setup(editor) {
          editor.on('Paste Change input Undo Redo', () => {
            handleBody(editor.getContent(), editor.targetElm.getAttribute('data-idx'))
          })

          editor.addButton('addFormField', {
            text: 'Form Fields ',
            tooltip: 'Add Form Field Value in Message',
            type: 'menubutton',
            icon: false,
            menu: formFields.map(i => !i.type.match(/^(file-up|recaptcha)$/) && ({ text: i.name, onClick() { editor.insertContent(`{${i.key}}`) } })),
          })
        },
      })
    }

    return function cleanup() {
      if (typeof tinymce !== 'undefined') {
        // eslint-disable-next-line no-undef
        tinymce.remove()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formFields])

  const handleTitle = e => {
    tem.title = e.target.value
    setTem({ ...tem })
  }

  const handleSubject = e => {
    tem.sub = e.target.value
    setTem({ ...tem })
  }


  const save = () => {
    mailTem.push(tem)
    setMailTem([...mailTem])
    history.push(`/builder/${formType}/${formID}/settings/email-templates`)
    saveForm()
  }

  const addFieldToSubject = e => {
    tem.sub += e.target.value
    setTem({ ...tem })
    e.target.value = ''
  }

  const addFieldToBody = e => {
    tem.body += e.target.value
    setTem({ ...tem })
    e.target.value = ''
  }

  return (
    <div className="w-7">
      <NavLink to={`/builder/${formType}/${formID}/settings/email-templates`} className="btn btcd-btn-o-gray">
        <span className="btcd-icn icn-arrow_back" />
        &nbsp;
        Back
      </NavLink>

      <button onClick={save} className="btn blue f-right" type="button">Save</button>

      <div className="mt-3">
        <b style={{ width: 135 }}>Template Name: </b>
        <input onChange={handleTitle} type="text" className="btcd-paper-inp w-7" placeholder="Name" value={tem.title} />
      </div>
      <div className="mt-3 flx">
        <b style={{ width: 142 }}>Subject:</b>
        <input onChange={handleSubject} type="text" className="btcd-paper-inp w-6" placeholder="Email Subject Here" value={tem.sub} />
        <select onChange={addFieldToSubject} className="btcd-paper-inp ml-2" style={{ width: 150 }}>
          <option value="">Add form field</option>
          {formFields !== null && formFields.map(f => !f.type.match(/^(file-up|recaptcha)$/) && <option key={f.key} value={`{${f.key}}`}>{f.name}</option>)}
        </select>
      </div>

      <div className="mt-3">
        <div><b>Body:</b></div>
        <select onChange={addFieldToBody} className="btcd-paper-inp mt-2 form-fields-em w-5">
          <option value="">Add form field</option>
          {formFields !== null && formFields.map(f => !f.type.match(/^(file-up|recaptcha)$/) && <option key={f.key} value={`{${f.key}}`}>{f.name}</option>)}
        </select>
        <label htmlFor={`t-m-e-${id}-${formID}`} className="mt-2 w-10">
          <textarea
            id={`t-m-e-${id}-${formID}`}
            onChange={e => handleBody(e.target.value)}
            className="btcd-editor btcd-paper-inp mt-1"
            rows="5"
            value={tem.body}
          />
        </label>
      </div>


    </div>
  )
}

export default EmailTemplateEdit
