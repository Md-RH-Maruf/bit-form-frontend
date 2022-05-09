/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { createRef, useRef, useState } from 'react'
import validateForm from '../../user-frontend/validation'
import { getCustomAttributs, getCustomClsName } from '../../Utils/globalHelpers'
import { renderHTMR } from '../../Utils/Helpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

export default function RadioBox({ attr, onBlurHandler, resetFieldValue, formID, fieldKey, styleClasses }) {
  const [value, setvalue] = useState(attr.val || '')
  const radioRef = useRef([])
  radioRef.current = attr.opt.map((_, i) => radioRef.current[i] ?? createRef())
  // useEffect(() => {
  //   if (attr.val && !attr.userinput) {
  //     setvalue(attr.val)
  //   } else if (!attr.val && !attr.userinput) {
  //     let defaultChecked
  //     if (attr.opt) {
  //       attr.opt.forEach(radioElment => {
  //         if (radioElment.check) {
  //           defaultChecked = radioElment.lbl
  //         }
  //       })
  //     }
  //     setvalue(defaultChecked || '')
  //   } else if (attr.conditional) {
  //     setvalue(attr.val)
  //   }
  // }, [attr.val, attr.userinput, attr.conditional, attr.opt])
  // useEffect(() => {
  //   if (resetFieldValue) {
  //     setvalue('')
  //   }
  // }, [resetFieldValue])
  // useEffect(() => {
  //   if (attr.hasWorkflow && attr.val === value && onBlurHandler && !attr.userinput) {
  //     const radioElm = radioRef.current.find(elm => elm.current.checked && elm.current.value === value)
  //     if (radioElm) {
  //       const { current } = radioElm
  //       onBlurHandler(current)
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [value])

  const onChangeHandler = (event) => {
    if (attr.valid.disabled) {
      return
    }
    setvalue(event.target.value)
    if (onBlurHandler) {
      onBlurHandler(event)
    }
  }

  const handleBlur = e => {
    const { name, form } = e.target
    validateForm({ input: { name, form, value } })
  }
  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={attr}
      >
        <div
          data-testid={`${fieldKey}-cc`}
          data-dev-cc={fieldKey}
          className={`${fieldKey}-cc ${getCustomClsName(fieldKey, 'cc')}`}
          {... { ...getCustomAttributs(fieldKey, 'cc') }}
        >
          {attr.opt.map((itm, i) => (
            <div
              data-testid={`${fieldKey}-cw`}
              data-dev-cw={fieldKey}
              key={`opr-${i + 22}`}
              className={`${fieldKey}-cw ${getCustomClsName(fieldKey, 'cw')}`}
              {... { ...getCustomAttributs(fieldKey, 'cw') }}
            >
              <input
                data-testid={`${fieldKey}-ci`}
                id={`${fieldKey}-chk-${i}`}
                type="radio"
                className={`${fieldKey}-ci ${getCustomClsName(fieldKey, 'ci')}`}
                ref={radioRef.current[i]}
                name={fieldKey}
                value={itm.val || itm.lbl}
                {...itm.check && { checked: true }}
                {...attr.valid.req && { required: true }}
                {...'name' in attr && { name: attr.name }}
                // {...{ checked: value === (itm.val || itm.lbl) }}
                // {...'readonly' in attr.valid && { readOnly: attr.valid.readonly }}
                checked={value === (itm.val || itm.lbl)}
                onChange={onChangeHandler}
                onBlur={handleBlur}
                {... { ...getCustomAttributs(fieldKey, 'ci') }}
              />
              <label
                data-testid={`${fieldKey}-cl`}
                data-dev-cl={fieldKey}
                data-cl
                htmlFor={`${fieldKey}-chk-${i}`}
                className={`${fieldKey}-cl ${getCustomClsName(fieldKey, 'cl')}`}
                {... { ...getCustomAttributs(fieldKey, 'cl') }}
              >
                {/* <span data-bx className={`${fieldKey}-bx`} /> */}
                <span
                  data-testid={`${fieldKey}-bx`}
                  data-dev-rdo={fieldKey}
                  data-bx
                  className={`${fieldKey}-bx ${fieldKey}-rdo ${getCustomClsName(fieldKey, 'rdo')}`}
                  {... { ...getCustomAttributs(fieldKey, 'rdo') }}
                >
                  <svg width="12" height="10" viewBox="0 0 12 10" className={`${fieldKey}-svgwrp ${getCustomClsName(fieldKey, 'svgwrp')}`}>
                    <use data-ck-icn href={`#${fieldKey}-ck-svg`} className={`${fieldKey}-ck-icn ${getCustomClsName(fieldKey, 'ck-icn')}`} />
                  </svg>
                </span>
                <span
                  data-testid={`${fieldKey}-ct`}
                  data-dev-ct={fieldKey}
                  className={`${fieldKey}-ct ${getCustomClsName(fieldKey, 'ct')}`}
                  {... { ...getCustomAttributs(fieldKey, 'ct') }}
                >
                  {renderHTMR(itm.lbl)}
                </span>
              </label>
            </div>
          ))}
        </div>
      </InputWrapper>
    </>
  )
}
