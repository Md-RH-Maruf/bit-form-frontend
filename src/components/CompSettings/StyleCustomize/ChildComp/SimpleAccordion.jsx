/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react'
import { useFela } from 'react-fela'
import { CSSTransition } from 'react-transition-group'
import ChevronDownIcn from '../../../../Icons/ChevronDownIcn'
import SimpleAccordionStyle from '../../../../styles/SimpleAccordion.style'
import { __ } from '../../../../Utils/i18nwrap'
import Cooltip from '../../../Utilities/Cooltip'
import SingleToggle from '../../../Utilities/SingleToggle'
import ut from '../../../../styles/2.utilities'

SimpleAccordion.defaultProps = {
  onOpen: () => { },
  open: false,
}

export default function SimpleAccordion({ className, title, toggleName, children, open, onOpen, switching, tip, tipProps, toggleAction, toggleChecked }) {
  const [tgl, setTgl] = useState(open)
  const [H, setH] = useState(open ? 'auto' : 0)

  const { css } = useFela()

  const toggleAccordion = (val) => {
    console.log('toogle acc')
    setTgl(val)
    val && onOpen()
  }

  // useEffect(() => {
  //   toggleAccordion(open)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [open])

  const cancelBubble = (e) => e.stopPropagation()

  return (
    <div className={`${className} ${tgl && 'active'}`}>
      <div
        className="btgl w-10"
        tabIndex="0"
        role="button"
        onClick={() => toggleAccordion(!tgl)}
        onKeyPress={() => toggleAccordion(!tgl)}
      >
        <div className={css(SimpleAccordionStyle.flxbwn)}>
          <span className={`title ${css(SimpleAccordionStyle.dflx)}`}>
            {title}
            {tip && (
              <Cooltip {...{ ...tipProps, className: 'hover-tip' }}>
                <div className="txt-body">{__(tip, 'bitform')}</div>
              </Cooltip>
            )}
          </span>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div onClick={cancelBubble} onKeyPress={cancelBubble} className={css(SimpleAccordionStyle.flxbwn)}>
            {switching && (
              <SingleToggle className={css(ut.mr2)} name={toggleName || title} action={toggleAction} isChecked={toggleChecked} />
            )}
            <ChevronDownIcn className="toggle-icn" size="20" rotate={!!tgl} />
          </div>
        </div>
      </div>

      <div style={{ height: H, transition: 'height 300ms', overflow: 'hidden' }}>
        <CSSTransition
          in={tgl}
          timeout={150}
          onEntering={el => setH(el.offsetHeight)}
          onEntered={() => setH('auto')}
          onExit={el => setH(el.offsetHeight)}
          onExiting={() => setH(0)}
          unmountOnExit
        >
          <div className="body">
            {children}
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}
