import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { $builderHistory, $fields, $layouts, $selectedFieldId } from '../GlobalStates'
import EllipsisIcon from '../Icons/EllipsisIcon'
import RedoIcon from '../Icons/RedoIcon'
import UndoIcon from '../Icons/UndoIcon'
import HistoryIcn from '../Icons/HistoryIcn'
import ut from '../styles/2.utilities'
import builderHistoryStyle from '../styles/builderHistory.style'
import OptionToolBarStyle from '../styles/OptionToolbar.style'
import { compactNewLayoutItem, filterLayoutItem } from '../Utils/FormBuilderHelper'
import Downmenu from './Utilities/Downmenu'
import Tip from './Utilities/Tip'
import Scrollbars from 'react-custom-scrollbars-2'

export default function FormBuilderHistory({ }) {
  const { css } = useFela()
  const [disabled, setDisabled] = useState(false)
  const [showHistory, setShowHistory] = useState(null)
  const [fields, setFields] = useRecoilState($fields)
  const [layouts, setLayouts] = useRecoilState($layouts)
  const [builderHistory, setBuilderHistory] = useRecoilState($builderHistory)
  const setSelectedFieldId = useSetRecoilState($selectedFieldId)
  const { active, histories } = builderHistory

  const handleUndoRedoShortcut = e => {
    if (e.target.tagName !== 'INPUT' && e.ctrlKey) {
      let action = ''
      if (e.key.toLowerCase() === 'z') {
        action = 'undo'
      } else if (e.key.toLowerCase() === 'y') {
        action = 'redo'
      }
      if (action) {
        e.preventDefault()
        const newActive = action === 'undo' ? active - 1 : active + 1
        handleHistory(newActive)
        return false
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleUndoRedoShortcut)

    return () => document.removeEventListener('keydown', handleUndoRedoShortcut)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, disabled])

  const actionsBasedOnType = {
    add_fld: 'remove_fld',
    remove_fld: 'add_fld',
  }

  // const handleHistory = indx => {
  //   if (indx < 0 || disabled) return
  //   const actionType = active >= indx ? 'undo' : 'redo'
  //   let changableHistories = []
  //   if (actionType === 'undo') {
  //     changableHistories = histories.slice(indx + 1).reverse()
  //   } else if (actionType === 'redo') {
  //     changableHistories = histories.slice(active + 1, indx + 1)
  //   }

  //   if (!changableHistories.length) return

  //   setDisabled(true)

  //   let draftLayouts = { ...layouts }
  //   const draftFields = { ...fields }
  //   changableHistories.forEach(({ action, state }) => {
  //     const historyAction = actionType === 'undo' ? actionsBasedOnType[action] : action
  //     if (historyAction === 'add_fld') {
  //       const { fldKey, breakpoint, layout, fldData } = state
  //       draftLayouts = compactNewLayoutItem(breakpoint, layout, draftLayouts)
  //       draftFields[fldKey] = fldData
  //     } else if (historyAction === 'remove_fld') {
  //       const { fldKey } = state
  //       draftLayouts = filterLayoutItem(fldKey, draftLayouts)
  //       delete draftFields[fldKey]
  //       setSelectedFieldId(null)
  //     }
  //   })

  //   sessionStorage.setItem('btcd-lc', '-')
  //   setLayouts(draftLayouts)
  //   setFields(draftFields)
  //   setBuilderHistory(oldHistory => ({ ...oldHistory, active: indx }))
  //   setDisabled(false)
  // }

  const handleHistory = indx => {
    if (indx < 0 || disabled) return

    const { state } = histories[indx]

    // setDisabled(true)
    sessionStorage.setItem('btcd-lc', '-')
    if (state.layouts) {
      setLayouts(state.layouts)
    }
    if (state.fields) {
      setFields(state.fields)
    }
    setBuilderHistory(oldHistory => ({ ...oldHistory, active: indx }))
    setDisabled(false)
  }

  return (
    <div>
      <div className={css(OptionToolBarStyle.option_right)}>
        <Tip msg="Undo">
          <button type="button" disabled={!active || disabled} className={css([OptionToolBarStyle.icn_btn, ut.icn_hover])} onClick={() => handleHistory(active - 1)}>
            <UndoIcon size="25" />
          </button>
        </Tip>
        <Tip msg="Redo">
          <button type="button" disabled={(active === (histories.length - 1)) || disabled} className={css([OptionToolBarStyle.icn_btn, ut.icn_hover])} onClick={() => handleHistory(active + 1)}>
            <RedoIcon size="25" />
          </button>
        </Tip>
        <Downmenu
          place="bottom-end"
          onShow={() => setShowHistory(true)}
          onHide={() => setShowHistory(false)}
        >
          <button type="button" className={`${css([OptionToolBarStyle.icn_btn, ut.icn_hover])} ${showHistory ? 'active' : ''}`}>
            <EllipsisIcon size="38" />
          </button>

          <div className={css(builderHistoryStyle.menu)}>
            <p className={css(builderHistoryStyle.title)}>
              <span className={css(ut.mr1)}><HistoryIcn size="20" /></span>
              History
            </p>
            
              {histories.length <= 1 && (
                <span className={css(builderHistoryStyle.secondary)}>
                  no data found
                </span>
              )}

              <ul className={css(builderHistoryStyle.list)}>
                {histories.map((history, indx) => (
                  <li key={`bf-${indx * 2}`} className={css(builderHistoryStyle.item)}>
                    <button
                      type="button"
                      className={`${css(builderHistoryStyle.btn)} ${active === indx && 'active'} ${active < indx && 'unactive'}`}
                      onClick={() => handleHistory(indx)}
                    >
                      {history.event}
                    </button>
                  </li>
                ))}
              </ul>
     
          </div>
        </Downmenu>
      </div>
    </div>
  )
}
