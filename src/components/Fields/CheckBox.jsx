/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect } from 'react'

export default function CheckBox({ attr, onBlurHandler, resetFieldValue }) {
  let defaultValue
  if ('val' in attr && attr.val && attr.val.length > 0) {
    if (typeof attr.val === 'string') {
      if (attr.val[0] === '[') {
        defaultValue = JSON.parse(attr.val)
      } else {
        defaultValue = attr.val.split(',')
      }
    } else if (Array.isArray(attr.val)) {
      defaultValue = attr.val
    }
  } else {
    defaultValue = attr.opt.map(checkBoxElement => checkBoxElement.check && checkBoxElement.lbl)
  }
  const [value, setvalue] = useState(defaultValue || [])
  const checkBoxRef = useRef(null)
  useEffect(() => {
    if (defaultValue && JSON.stringify(defaultValue) !== JSON.stringify(value) && !attr.userinput) {
      setvalue(defaultValue)
    } else if (attr.conditional) {
      setvalue(defaultValue)
    }
  }, [attr.val, attr.userinput, attr.conditional, defaultValue, value])
  useEffect(() => {
    if (resetFieldValue) {
      setvalue([])
    }
  }, [resetFieldValue])
  useEffect(() => {
    // console.log('value',typeof value, attr.name, defaultValue , defaultValue === value , onBlurHandler , !attr.isRecursive)
    if (attr.hasWorkflow && JSON.stringify(defaultValue) === JSON.stringify(value) && onBlurHandler && !attr.userinput) {
      const { current } = checkBoxRef
      onBlurHandler(current)
    }
  }, [value])
  const onChangeHandler = (event) => {
    const index = value.indexOf(event.target.value)
    if (event.target.checked && index === -1) {
      setvalue([...value, event.target.value])
    } else if (!event.target.checked && index >= 0) {
      setvalue(value.filter(v => v !== event.target.value))
    }
    if (onBlurHandler) {
      onBlurHandler(event)
    }
  }
  return (
    (
      !('hide' in attr.valid && attr.valid.hide === true)
      && (
        <div className="fld-wrp drag" btcd-fld="textarea">
          {'lbl' in attr && <label className="fld-lbl">{attr.lbl}</label>}
          <div className={`no-drg fld btcd-ck-con ${attr.round && 'btcd-round'}`}>
            {attr.opt.map((itm, i) => (
              <label key={`opt-${i + 22}`} className="btcd-ck-wrp">
                <span>{itm.lbl}</span>
                <input
                  type="checkbox"
                  ref={checkBoxRef}
                  // {...itm.check && { defaultChecked: true }}
                  // {...value && value.indexOf(itm.lbl) >= 0 && { defaultChecked: true }}
                  {...'lbl' in itm && { defaultValue: itm.lbl }}
                  {...itm.req && { required: true }}
                  {...'name' in attr && { name: `${attr.name}[]` }}
                  {...{ checked: value && value.indexOf(itm.lbl) >= 0 }}
                  onChange={onChangeHandler}
                />
                <span className="btcd-mrk ck" />
              </label>
            ))}
          </div>
        </div>
      )
    )
  )
}
