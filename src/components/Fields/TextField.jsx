/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { memo, useEffect, useRef, useState } from 'react'
import validateForm from '../../user-frontend/validation'
import { observeElement, select } from '../../Utils/globalHelpers'
import InputWrapper from '../InputWrapper'
import RenderStyle from '../style-new/RenderStyle'

function TextField({ fieldKey, attr, onBlurHandler, resetFieldValue, formID, styleClasses }) {
  const type = attr.typ === 'url' ? 'text' : attr.typ
  const textFieldRef = useRef(null)
  const [value, setvalue] = useState(attr.val !== undefined ? attr.val : '')
  useEffect(() => {
    if (attr.val !== undefined && !attr.userinput) {
      setvalue(attr.val)
    } else if (!attr.val && !attr.userinput) {
      setvalue(attr.defaultValue || '')
    } else if (attr.conditional) {
      setvalue(attr.val)
    }
  }, [attr.val, attr.defaultValue, attr.userinput, attr.conditional])
  useEffect(() => {
    if (resetFieldValue) {
      setvalue('')
    }
  }, [resetFieldValue])
  useEffect(() => {
    if (attr.hasWorkflow && attr.val === value && onBlurHandler && !attr.userinput) {
      const { current } = textFieldRef
      onBlurHandler(current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const onChangeHandler = (event) => {
    const val = attr.typ === 'email' ? event.target.value.toLowerCase() : event.target.value
    setvalue(val)
  }

  useEffect(() => {
    const textFld = select(`#${fieldKey}`)
    if (textFld) {
      observeElement(textFld, 'value', (oldVal, newVal) => setvalue(attr.typ === 'email' ? newVal.toLowerCase() : newVal))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBlur = e => validateForm({ input: e.target })

  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <InputWrapper
        formID={formID}
        fieldKey={fieldKey}
        fieldData={attr}
      >
        <div data-dev-inp-fld-wrp={fieldKey} className={`${fieldKey}-inp-fld-wrp`}>
          <input
            data-dev-fld={fieldKey}
            id={fieldKey}
            list={`${fieldKey}-datalist`}
            ref={textFieldRef}
            className={`${fieldKey}-fld no-drg`}
            type={type}
            {...'req' in attr.valid && { required: attr.valid.req }}
            {...'disabled' in attr && { disabled: attr.disabled }}
            {...'readonly' in attr && { readOnly: attr.readonly }}
            {...'ph' in attr && { placeholder: attr.ph }}
            {...'mn' in attr && { min: attr.mn }}
            {...'mx' in attr && { max: attr.mx }}
            {...'ac' in attr && { autoComplete: attr.ac }}
            {...'name' in attr && { name: attr.name }}
            {...'inputMode' in attr && { inputmode: attr.inputMode }}
            {...onBlurHandler && { onInput: onBlurHandler }}
            onBlur={handleBlur}
            {...{ value }}
            {...{ onChange: onChangeHandler }}
          />

          {attr.prefixIcn && <img data-dev-pre-i={fieldKey} className={`${fieldKey}-pre-i`} height="90%" src={attr.prefixIcn} alt="" />}
          {attr.suffixIcn && <img data-dev-suf-i={fieldKey} className={`${fieldKey}-suf-i`} height="90%" src={attr.suffixIcn} alt="" />}

        </div>
        {attr.suggestions?.length && (
          <datalist id={`${fieldKey}-datalist`}>
            {attr.suggestions.map(sugg => (
              <option key={sugg.val || sugg.lbl} value={sugg.val || sugg.lbl}>{sugg.lbl}</option>
            ))}
          </datalist>
        )}
      </InputWrapper>
    </>
  )
}
export default memo(TextField)
