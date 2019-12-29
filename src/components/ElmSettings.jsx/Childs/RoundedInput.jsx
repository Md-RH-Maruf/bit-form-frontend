/* eslint-disable no-param-reassign */
import React from 'react'

export default function RoundedInput(props) {
  const regx = /round/
  const isRound = regx.test(props.elm.data.child[1].attr.className)

  const updateisRound = e => {
    if (e.target.value === 'Square') {
      props.elm.data.child[1].attr.className = props.elm.data.child[1].attr.className.replace(/round/g, '')
    } else {
      props.elm.data.child[1].attr.className += ' round'
    }
    props.updateData(props.elm)
  }
  return (
    <div>
      <div className="mt-3 setting-inp">
        <span>Check Box isRound:</span>
        <select value={!isRound ? 'Square' : 'Round'} onChange={updateisRound} name="" id="">
          <option value="Square">Square</option>
          <option value="Round">Round</option>
        </select>
      </div>
    </div>
  )
}
