import React from 'react'

export default function TableCheckBox(props) {
  const id = 'id' in props ? props.id : Math.random()
  return (
    <div>
      <label htmlFor={`btcd-cbx-${id}`} className="btcd-label-cbx">
        <input id={`btcd-cbx-${id}`} type="checkbox" className="btcd-cbx-invisible" {...props.rest} ref={props.refer} />
        <div className="btcd-t-cbx">
          <svg width="20px" height="20px" viewBox="0 0 20 20">
            <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z" />
            <polyline points="4 11 8 15 16 6" />
            <line x1="7" y1="10" x2="13" y2="10" />
          </svg>
        </div>
        <span>{props.title}</span>
      </label>
    </div>
  )
}
