import React from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'


function DropDown({ options, placeholder, action, className, isMultiple, value, addable, titleClassName, title,jsonValue }) {
  if (!options || options === null || options.length === 0) {
    // eslint-disable-next-line no-param-reassign
    options = undefined
  }
  /* const s = React.useRef(null)

  const config = {
    select: s.current,
    allowDeselect: true,
    placeholder: props.placeholder,
    searchPlaceholder: props.searchPH,
  }

  if (props.addable) {
    config.addable = val => ({ text: val, value: val })
  }

  useEffect(() => {
    config.select = s.current
    // eslint-disable-next-line no-new
    new SlimSelect(config)
  }, [config]) */

  return (
    <div className={`${titleClassName}`}>
      <span>{title}</span>
      <MultiSelect
        width="100%"
        defaultValue={value}
        className={`${className}`}
        onChange={action}
        singleSelect={!isMultiple}
        placeholder={placeholder}
        jsonValue={jsonValue}
        options={(options !== null && options !== false) && options}
      />
      {/* <select value={props.value} ref={s} multiple={props.isMultiple} onChange={props.action} className={`btcd-app-slim ${props.className}`}>
        {props.options !== null
          && props.options !== false
          && props.options.map(item => <option key={`key${item.name}`} value={item.value}>{item.name}</option>)}
      </select> */}
    </div>
  )
}

export default (DropDown)
