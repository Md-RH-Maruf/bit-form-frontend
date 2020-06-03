/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import SlimSelect from 'slim-select'
import bitsFetch from '../Utils/bitsFetch'
import CompGen from '../components/CompGen'
import checkLogic from './checkLogic'

export default function Bitforms(props) {
  const [snack, setSnack] = useState(false)
  const [message, setMessage] = useState(null)
  const [buttonDisabled, setbuttonDisabled] = useState(false)
  const [redirectPage, setredirectPage] = useState(null)
  const [data, setdata] = useState(props.data)
  const [layout, setlayout] = useState(props.layout)
  const [hasError, sethasError] = useState(false)
  const [resetFieldValue, setresetFieldValue] = useState(false)
  const [layoutSize, setlayoutSize] = useState(window.innerWidth > 800 ? 'lg' : window.innerWidth > 600 ? 'md' : 'sm')
  let maxRowIndex = 0
  const blk = (field) => {
    const name = data[field.i].lbl ? field.i + data[field.i].lbl.split(' ').join('_') : field.i
    // eslint-disable-next-line no-param-reassign
    data[field.i].name = name
    if (props.gRecaptchaSiteKey && props.gRecaptchaSiteKey !== null && data[field.i].typ === 'recaptcha') {
      data[field.i].siteKey = props.gRecaptchaSiteKey
    }
    maxRowIndex = maxRowIndex > field.y + field.h ? maxRowIndex : field.y + field.h
    return (
      <div
        style={{
          gridColumnStart: field.x + 1, /* x-0 -> (x + 1) */
          gridColumnEnd: (field.x + 1) + field.w, /* w-4 -> x + w */
          gridRowStart: field.y + 1, /* y-0 -> y + 1 */
          gridRowEnd: field.y !== 1 && field.h + (field.y + 1), /* h-4 -> if y not 1 then h+y */
          minHeight: field.h * 40, /* h * 40px */
        }}
        key={field.i}
        btcd-id={field.i}
        data-grid={field}
        role="button"
      >
        <CompGen
          editMode
          atts={data[field.i]}
          formID={props.formID}
          entryID={props.entryID}
          onBlurHandler={onBlurHandler}
          resetFieldValue={resetFieldValue}
        />
      </div>
    )
  }
  const onBlurHandler = (event) => {
    let maybeReset = false
    const element = event.target
    const { form } = event.target
    const newData = data !== undefined && JSON.parse(JSON.stringify(data))
    if (resetFieldValue) {
      setresetFieldValue(false)
    }
    let targetFieldName
    const fieldNameToQuery = element.name
    if (element.name && element.name.indexOf('[]') !== -1 && element.name.indexOf('[]') === element.name.length - 2) {
      targetFieldName = element.name.substring(0, element.name.length - 2)
    } else {
      targetFieldName = element.name
    }
    if (newData[props.fieldsKey[targetFieldName]] && newData[props.fieldsKey[targetFieldName]].error) {
      delete newData[props.fieldsKey[targetFieldName]].error
      maybeReset = true
    }
    if (props.fieldToCheck[targetFieldName] !== undefined) {
      const fieldData = []
      Object.keys(props.fieldToCheck).forEach(fieldName => {
        let currentField
        if (targetFieldName === fieldName) {
          currentField = fieldNameToQuery
        } else {
          currentField = fieldName
        }
        const fieldDetails = form.querySelectorAll(`[name^='${currentField}']`)
        // const fieldDetails = document.getElementsByName(currentField)
        // console.log('fieldDetails', form.querySelectorAll(`*[name='${currentField}']`))
        if (fieldDetails.length > 0) {
          let value
          let multiple
          const { type } = fieldDetails[0]
          if (type === 'checkbox' || type === 'select-multiple' || type === 'select-one' || type === 'radio') {
            switch (type) {
              case 'checkbox':
                // eslint-disable-next-line no-case-declarations
                const checkedValue = []
                fieldDetails.forEach(option => { option.checked && option.value && checkedValue.push(option.value) })
                value = checkedValue
                multiple = true
                break;

              case 'select-multiple':
                // console.log('MULPLfieldDetails', fieldDetails)
                // eslint-disable-next-line no-case-declarations
                const selectedValue = []
                if (fieldDetails[0].slim) {
                  fieldDetails[0].slim.data.data.forEach((option => { option.selected && option.value && selectedValue.push(option.value) }))
                } else {
                  fieldDetails[0].childNodes.forEach((option => { option.selected && option.value && selectedValue.push(option.value) }))
                }
                value = selectedValue
                multiple = true
                break;

              case 'select-one':
                value = fieldDetails[0].value
                break;

              case 'radio':
                fieldDetails.forEach(option => { if (option.checked && option.value) value = option.value })
                break;

              default:
                break;
            }
          } else {
            value = fieldDetails[0].value
            multiple = fieldDetails[0].multiple
          }
          fieldData[fieldName] = {
            type,
            value,
            multiple,
          }
        }
      });
      props.fieldToCheck[targetFieldName].forEach(LogicIndex => {
        const logicStatus = checkLogic(props.conditional[LogicIndex].logics, fieldData)
        console.log('checkLogic', logicStatus)
        if (logicStatus) {
          props.conditional[LogicIndex].actions.forEach(actionDetail => {
            if (actionDetail.action !== undefined && actionDetail.field !== undefined) {
              switch (actionDetail.action) {
                case 'value':
                  if (actionDetail.val !== undefined && newData[props.fieldsKey[actionDetail.field]]) {
                    newData[props.fieldsKey[actionDetail.field]].val = actionDetail.val;
                    newData[props.fieldsKey[actionDetail.field]].userinput = true
                    maybeReset = true
                  }
                  break

                case 'hide':
                  if (newData[props.fieldsKey[actionDetail.field]]) { newData[props.fieldsKey[actionDetail.field]].valid.hide = true; maybeReset = true }
                  break;

                case 'disable':
                  if (newData[props.fieldsKey[actionDetail.field]]) { newData[props.fieldsKey[actionDetail.field]].valid.disabled = true; maybeReset = true }
                  break;

                case 'enable':
                  if (newData[props.fieldsKey[actionDetail.field]]) { newData[props.fieldsKey[actionDetail.field]].valid.disabled = false; maybeReset = true }
                  break;

                case 'show':
                  if (newData[props.fieldsKey[actionDetail.field]]) {
                    newData[props.fieldsKey[actionDetail.field]].valid.hide = false;
                    if (newData[props.fieldsKey[actionDetail.field]].typ === 'hidden') {
                      newData[props.fieldsKey[actionDetail.field]].typ = 'text';
                    }
                    maybeReset = true
                  }
                  break
                default:
                  break
              }
            }
          })
        } else {
          props.conditional[LogicIndex].actions.forEach(actionDetail => {
            if (actionDetail.action !== undefined && actionDetail.field !== undefined) {
              switch (actionDetail.action) {
                case 'value':
                  if (actionDetail.val !== undefined && newData[props.fieldsKey[actionDetail.field]]) {
                    newData[props.fieldsKey[actionDetail.field]].val = props.data[props.fieldsKey[actionDetail.field]].val
                    newData[props.fieldsKey[actionDetail.field]].userinput = false
                    maybeReset = true
                  }
                  break

                case 'hide':
                  if (newData[props.fieldsKey[actionDetail.field]]) {
                    newData[props.fieldsKey[actionDetail.field]].valid.hide = props.data[props.fieldsKey[actionDetail.field]].valid.hide
                    maybeReset = true
                  }
                  break;

                case 'disable':
                  if (newData[props.fieldsKey[actionDetail.field]]) {
                    newData[props.fieldsKey[actionDetail.field]].valid.disabled = props.data[props.fieldsKey[actionDetail.field]].valid.disabled
                    maybeReset = true
                  }
                  break;

                case 'enable':
                  if (newData[props.fieldsKey[actionDetail.field]]) {
                    newData[props.fieldsKey[actionDetail.field]].valid.disabled = props.data[props.fieldsKey[actionDetail.field]].valid.disabled
                    maybeReset = true
                  }
                  break;

                case 'show':
                  if (newData[props.fieldsKey[actionDetail.field]]) {
                    newData[props.fieldsKey[actionDetail.field]].valid.hide = props.data[props.fieldsKey[actionDetail.field]].valid.hide
                    if (newData[props.fieldsKey[actionDetail.field]].typ === 'hidden') {
                      newData[props.fieldsKey[actionDetail.field]].typ = props.data[props.fieldsKey[actionDetail.field]].typ
                    }
                    maybeReset = true
                  }
                  break
                default:
                  break
              }
            }
          })
        }
      })
    }
    if (maybeReset) {
      setdata(newData)
    }
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
      setlayoutSize('lg')
    } else if (window.innerWidth > 600) {
      setlayoutSize('md')
    } else {
      setlayoutSize('sm')
    }
  }, { passive: true })

  const handleSubmit = (event) => {
    event.preventDefault()
    setbuttonDisabled(true)
    snack && setSnack(false)
    const formData = new FormData()
    const fields = Array.prototype.slice.call(event.target)
    // eslint-disable-next-line array-callback-return
    fields.filter(el => {
      if (el.type === 'file' && el.files.length > 0) {
        let fileName
        if (el.files.length > 1) {
          fileName = `${el.name}[]`
        } else {
          fileName = el.name
        }
        if (el.files.forEach) {
          el.files.forEach(file => formData.append(fileName, file))
        } else {
          Array.prototype.slice.call(el.files).forEach(file => formData.append(fileName, file))
        }
      } else if ((el.type === 'checkbox' || el.type === 'radio') && el.checked) {
        formData.append(el.name, el.value)
      } else if (el.type === 'select-multiple') {
        if ('slim' in el && 'data' in el.slim && 'data' in el.slim.data && el.slim.data.data.length > 0) {
          const selectedData = el.slim.data.data
          const name = el.name.substr(el.name.length - 2, el.name.length) === '[]' ? el.name : `${el.name}[]`
          selectedData.forEach(optionData => {
            if (optionData.selected) {
              formData.append(name, optionData.value)
            }
          })
        } else {
          formData.append(el.name, el.value)
        }
      } else if (el.type === 'select-one') {
        formData.append(el.name, el.value)
      } else if (!(el.type === 'checkbox' || el.type === 'radio' || el.type === 'file' || el.type === 'select')) {
        formData.append(el.name, el.value)
      }
    })
    let submitResponse
    if (props.gRecaptchaVersion && props.gRecaptchaVersion !== null && props.gRecaptchaVersion === 'v3') {
      grecaptcha.ready(() => {
        grecaptcha.execute(props.gRecaptchaSiteKey, { action: 'homepage' }).then((token) => {
          formData.append('g-recaptcha-response', token)
          submitResponse = bitsFetch(formData, 'bitforms_submit_form', 'multipart/form-data')
            .then(response => response)
        })
      })
    } else {
      submitResponse = bitsFetch(formData, 'bitforms_submit_form', 'multipart/form-data')
        .then(response => response)
    }
    submitResponse.then(result => {
      if (result !== undefined && result.success) {
        handleReset()
        if (typeof result.data === 'object') {
          setMessage(result.data.message)
          setredirectPage(result.data.redirectPage)
          setSnack(true)
          if (hasError) {
            sethasError(false)
          }
        } else {
          setMessage(result.data)
          setredirectPage(null)
          setSnack(true)
        }
      } else if (result.data && typeof result.data === 'string') {
        setMessage(result.data)
        sethasError(true)
        setSnack(true)
      } else if (result.data && result.data.data && typeof result.data.data === 'string') {
        setMessage(result.data.data)
        sethasError(true)
        setSnack(true)
      } else if (result.data && result.data.data) {
        if (result.data.data.$form !== undefined) {
          setMessage(JSON.parse(JSON.stringify(result.data.data.$form)))
          sethasError(true)
          setSnack(true)
          delete result.data.data.$form
        }
        console.log(typeof result.data.data, result.data.data, Object.keys(result.data.data).length)
        if (Object.keys(result.data.data).length > 0) {
          const newData = data !== undefined && JSON.parse(JSON.stringify(data))
          Object.keys(result.data.data).map(element => {
            newData[props.fieldsKey[element]].error = result.data.data[element]
          });
          setdata(newData)
        }
      }
      setbuttonDisabled(false)
    })
  }

  const handleReset = () => {
    setresetFieldValue(true)
  }

  useEffect(() => {
    if (resetFieldValue) {
      setresetFieldValue(false)
    }
    return () => {
      setresetFieldValue(false)
    }
  }, [resetFieldValue])
  useEffect(() => {
    if (props.error) {
      if (props.error.$form !== undefined) {
        sethasError(true)
        setMessage(JSON.parse(JSON.stringify(props.error.$form)))
        setSnack(true)
        delete props.error.$form
      }
      if (Object.keys(props.error).length > 0) {
        const newData = data !== undefined && JSON.parse(JSON.stringify(data))
        Object.keys(props.error).map(element => {
          newData[props.fieldsKey[element]].error = props.error[element]
        });
        setdata(newData)
      }
    }
  }, [props.error])

  useEffect(() => {
    if (document.querySelector('.slim') != null) {
      const allSel = document.querySelectorAll('select.slim')
      for (let i = 0; i < allSel.length; i += 1) {
        // eslint-disable-next-line no-unused-vars
        const s = new SlimSelect({
          select: `[btcd-id="${allSel[i].parentNode.parentNode.getAttribute(
            'btcd-id',
          )}"] > div > .slim`,
          allowDeselect: true,
          placeholder: allSel[i].getAttribute('placeholder'),
          limit: Number(allSel[i].getAttribute('limit')),
        })

        if (allSel[i].nextSibling != null) {
          if (allSel[i].hasAttribute('data-max-show')) {
            allSel[i].nextSibling.children[1].children[1].style.maxHeight = `${Number(allSel[i].getAttribute('data-max-show')) * 2}pc`
          }
        }
      }
    }
  }, [])

  const style = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto auto auto',
    gridgap: 0,
  }
  return (
    <div>
      <form ref={props.refer} id={`form-${props.contentID}`} encType={props.file ? 'multipart/form-data' : ''} onSubmit={handleSubmit} method="POST">
        {!props.editMode && <input type="hidden" value={process.env.NODE_ENV === 'production' && props.nonce} name="bitforms_token" />}
        {!props.editMode && <input type="hidden" value={process.env.NODE_ENV === 'production' && props.appID} name="bitforms_id" />}
        <div
          style={style}
        // cols={{ lg: 10 }}
        // breakpoints={{ lg: 800 }}
        // cols={{ lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 }}
        // breakpoints={{ lg: 1100, md: 800, sm: 600, xs: 400, xxs: 330 }}
        // rowHeight={40}
        // margin={[0, 10]}
        >
          {layout[layoutSize].map(field => {
            // eslint-disable-next-line no-param-reassign
            field.static = true

            return blk(field)
          })}
        </div>
        {!props.editMode && props.buttons
          && (
            <div>
              <CompGen
                atts={props.buttons}
                // formID={bitFormsFront.contentID}
                entryID={props.entryID}
                buttonDisabled={buttonDisabled}
                handleReset={handleReset}
              />
            </div>
          )}
      </form>
      {
        snack
        && (typeof message === 'string' ? <Toast msg={message} show={snack} setSnack={setSnack} redirectPage={redirectPage} error={hasError} /> : message.map((msg, index) => <Toast msg={msg} show={snack} setSnack={setSnack} redirectPage={redirectPage} error={hasError} index={index} canClose={message.length - 1 === index} editMode={props.editMode} />))
      }
    </div>
  )
}

function Toast(props) {
  const [snack, setSnack] = useState(true)
  const closeButtonStyle = {
    position: props.editMode ? 'absolute' : 'inherit',
    top: props.editMode && -20,
    right: props.editMode && -15,
    background: 'red',
    height: '25px',
    width: '25px',
    fontSize: '21px',
    padding: '3px 6px',
    color: 'white',
    borderRadius: '50px',
    lineHeight: '0.8',
    marginLeft: '7px',
    cursor: 'pointer',
    float: !props.editMode && 'right',
  }
  const toatStyles = {
    userSelect: 'none',
    background: '#383838',
    padding: '10px 15px',
    color: 'white',
    borderRadius: '5px',
    position: props.editMode ? 'fixed' : 'inherit',
    bottom: props.editMode && 20,
    right: props.editMode && 20,
    left: props.editMode && 20,
    marginBottom: !props.editMode && 10,
    boxShadow: '1px 1px 3px 0px #0000004d',
    transition: 'right 0.5s',
  }
  if (props.index && props.index > 0) {
    if (props.editMode) {
      toatStyles.bottom += props.index * 2 * 45
    }
  }
  useEffect(() => {
    if (!snack && props.canClose && props.show) {
      props.setSnack(false)
    } else if (!snack && !props.index && props.show) {
      props.setSnack(false)
    }
  }, [snack])
  useEffect(() => {
    const resetTime = props.error ? 10000 : 5000
    const timer = setTimeout(() => {
      if (props.show) {
        // !props.index && props.canClose === undefined && props.setSnack(false)
        props.setSnack(false)
        if (!props.error) {
          if (props.redirectPage !== null) {
            window.location = decodeURI(props.redirectPage)
          }
        }
      }
    }, resetTime);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return snack && (
    <div style={toatStyles}>
      <button onClick={() => setSnack(false)} style={closeButtonStyle} type="button">&times;</button>
      {
        /<\/?[a-z][\s\S]*>/i.test(props.msg)
          ? (
            <div
              dangerouslySetInnerHTML={{ __html: props.msg }}
            />
          )
          : props.msg
      }
    </div>
  )
}
