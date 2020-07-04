/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect } from 'react'

export default function RadioBox({ attr, onBlurHandler, resetFieldValue }) {
  const [value, setvalue] = useState(attr.val)
  const radioRef = useRef(null)
  useEffect(() => {
    if (attr.val && !attr.userinput) {
      setvalue(attr.val)
    } else if (!attr.val && !attr.userinput) {
      let defaultChecked
      if (attr.opt) {
        attr.opt.forEach(radioElment => {
          if (radioElment.check) {
            defaultChecked = radioElment.lbl
          }
        })
      }
      setvalue(defaultChecked || '')
    } else if (attr.conditional) {
      setvalue(attr.val)
    }
  }, [attr.val, attr.userinput, attr.conditional, attr.opt])
  useEffect(() => {
    if (resetFieldValue) {
      setvalue('')
    }
  }, [resetFieldValue])
  useEffect(() => {
    if (attr.hasWorkflow && attr.val === value && onBlurHandler && !attr.userinput) {
      const { current } = radioRef
      onBlurHandler(current)
    }
  }, [value])
  const onChangeHandler = (event) => {
    if (attr.valid.disabled) {
      return
    }
    setvalue(event.target.value)
    if (onBlurHandler) {
      onBlurHandler(event)
    }
  }
  const n = Math.random()

  return (
    <div className="fld-wrp drag" btcd-fld="textarea">
      {'lbl' in attr && <label className="fld-lbl">{attr.lbl}</label>}
      <div className={`no-drg fld btcd-ck-con ${attr.round && 'btcd-round'}`}>
        {attr.opt.map((itm, i) => (
          <label key={`opr-${i + 22}`} className="btcd-ck-wrp">
            <span>{itm.lbl}</span>
            <input
              type="radio"
              ref={radioRef}
              name={n}
              value={itm.lbl}
              {...itm.check && { checked: true }}
              {...itm.req && { required: true }}
              {...'name' in attr && { name: attr.name }}
              {...{ checked: value === itm.lbl }}
              onChange={onChangeHandler}
            />
            <span className="btcd-mrk rdo" />
          </label>
        ))}
      </div>
    </div>
  )
}
