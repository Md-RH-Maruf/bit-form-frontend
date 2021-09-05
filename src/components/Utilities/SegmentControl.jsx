import { useEffect, useRef, useState } from 'react'
import { useFela } from 'react-fela'
import { __ } from '../../Utils/i18nwrap'

function SegmentControl({ defaultActive, options, size = 100, component = 'a', onChange, variant = 'white' }) {
  const { css } = useFela()
  const baseSize = Number(size) // 100
  const floor = (number) => (Math.floor(baseSize / number))
  const clr = {}

  if (variant === 'white') {
    clr.tabBg = 'var(--white-0-95)'
    clr.selectorBg = 'var(--white-100)'
    clr.active = 'var(--b-50) !important'
  }
  if (variant === 'blue') {
    clr.tabBg = '#454A65'
    clr.selectorBg = 'var(--b-50)'
    clr.active = 'var(--b-44-87)'
  }
  const style = {
    wrapper: {
      ta: 'center',
      mx: 'auto',
    },
    tabs: {
      fs: floor(6.67), // 15
      py: floor(33.34), // 3
      px: floor(20), // 5
      bg: clr.tabBg, // '#f1f1f1',
      ls: 'none',
      d: 'inline-block',
      br: floor(7.15), // 14,
      pos: 'relative',
      '& .active': { clr: 'var(--white-100) !important' },
      '& button': {
        bg: 'none',
        ol: 'none',
        b: 'none',
      },
    },
    selector: {
      w: 0,
      h: '80%',
      d: 'inline-block',
      pos: 'absolute',
      xl: floor(20), // 5
      yt: '50%',
      tf: 'translatey(-50%)',
      z: 1,
      br: floor(9.09), // 11,
      tdu: '0.5s',
      ttf: 'cubic-bezier(0.68, -0.55, 0.36, 1.35)',
      bg: clr.selectorBg, // '#fff',
    },
    tab_link: {
      cr: 'pointer',
      td: 'none',
      fw: 500,
      flxi: 'align-center',
      pos: 'relative',
      py: floor(10), // 10,
      px: floor(5), // 20,
      z: 1,
      tdl: '0.3s',
      tdu: '0.6s',
      clr: clr.active,
      ':hover:not(.active)': {
        clr: 'var(--white-0-100-90)', // '#333',
        tdl: '0s',
        tdu: '300ms',
      },
      '& .icn': {
        mr: floor(20),
        size: floor(9),
        d: 'block',
        o: 'hidden',
      },
      '& .icn img, .icn svg': {
        o: 0,
        tf: 'scale(0)',
        // mt: floor(20), // 5
      },
    },
    segment_img: {
      '& img, svg': {
        o: '1 !important',
        tf: 'scale(1) !important',
        tdl: '.3s',
        tdu: '300ms',
      },
    },
  }
  const selectorRef = useRef(null)
  const tabsRef = useRef(null)
  const [active, setactive] = useState(defaultActive || options[0].label)

  const setSelectorPos = (activeElement) => {
    const { width: toActiveElmWidth } = activeElement.getBoundingClientRect()
    selectorRef.current.style.left = `${activeElement.offsetLeft}px`
    selectorRef.current.style.width = `${toActiveElmWidth}px`
  }

  useEffect(() => {
    const toActiveElement = tabsRef.current.querySelector(`[data-label="${active}"]`)
    setSelectorPos(toActiveElement)
  }, [active])

  const eventHandler = (e, i) => {
    e.preventDefault()
    if (e.type === 'keypress' && e.code !== 'Space') return
    if (e.type === 'keypress' && e.code !== 'Enter') return

    let elm = e.target
    if (e.target.tagName !== component.toUpperCase()) {
      elm = e.target.parentNode
    }

    tabsRef.current.querySelector(`.tabs ${component}.active`).classList.remove('active')
    setSelectorPos(elm)
    setactive(options[i].label)
    onChange(options[i].label)
  }

  return (
    <div className={css(style.wrapper)}>
      <div ref={tabsRef} className={`${css(style.tabs)} tabs`}>
        <div ref={selectorRef} className={`selector ${css(style.selector)}`} />
        {component === 'a' && options?.map((item, i) => (
          <a
            key={`segment-option-${i * 10}`}
            className={`${css(style.tab_link)} ${active === item.label ? ' active' : ''}`}
            onClick={e => eventHandler(e, i)}
            onKeyPress={e => eventHandler(e, i)}
            href={`#${item.label}`}
            data-label={item.label}
          >
            {item.icn && (
              <span className={`icn ${active === item.label ? css(style.segment_img) : ''}`}>{item.icn}</span>
            )}
            {item.label}
          </a>
        ))}
        {component === 'button' && options?.map((item, i) => (
          // eslint-disable-next-line react/button-has-type
          <button
            key={`segment-option-${i * 10}`}
            className={`${css(style.tab_link)} ${active === item.label ? ' active' : ''}`}
            onClick={e => eventHandler(e, i)}
            onKeyPress={e => eventHandler(e, i)}
            data-label={item.label}
          >
            {item.icn && (
              <span className={`icn ${active === item.label ? css(style.segment_img) : ''}`}>{item.icn}</span>
            )}
            {__(item.label, 'bitform')}
          </button>
        ))}

      </div>
    </div>
  )
}

export default SegmentControl
