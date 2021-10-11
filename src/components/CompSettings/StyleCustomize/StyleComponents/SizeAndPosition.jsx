/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $breakpoint, $layouts, $updateBtn } from '../../../../GlobalStates'
import ut from '../../../../styles/2.utilities'
import FieldStyle from '../../../../styles/FieldStyle.style'
import SimpleAccordion from '../ChildComp/SimpleAccordion'

function SizeAndPosition({ fieldKey }) {
  const { css } = useFela()
  const [layouts, setLayouts] = useRecoilState($layouts)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const breakpoint = useRecoilValue($breakpoint)
  const fieldSize = layouts[breakpoint].filter(fl => (fl.i === fieldKey))

  // console.log(layouts)

  const maxValue = {
    lg: { w: 60, h: '', x: '', y: '' },
    md: { w: 40, h: '', x: '', y: '' },
    sm: { w: 20, h: '', x: '', y: '' },
  }

  const xHandler = (e) => {
    const val = Number(e.target.value)
    if (!maxValue[breakpoint].x >= val) return
    setLayouts(layout => produce(layout, draft => {
      const layIndex = draft[breakpoint].findIndex(fl => (fl.i === fieldKey))
      draft[breakpoint][layIndex].x = val
    }))
    setUpdateBtn({ unsaved: true })
  }
  const wHandler = (e) => {
    const val = Number(e.target.value)
    if (!maxValue[breakpoint].w >= val) return
    setLayouts(layout => produce(layout, draft => {
      const layIndex = draft[breakpoint].findIndex(fl => (fl.i === fieldKey))
      draft[breakpoint][layIndex].w = val
    }))
    setUpdateBtn({ unsaved: true })
  }
  const yHandler = (e) => {
    const val = Number(e.target.value)
    if (!maxValue[breakpoint].y >= val) return
    setLayouts(layout => produce(layout, draft => {
      const layIndex = draft[breakpoint].findIndex(fl => (fl.i === fieldKey))
      draft[breakpoint][layIndex].y = val
    }))
    setUpdateBtn({ unsaved: true })
  }
  const hHandler = (e) => {
    const val = Number(e.target.value)
    if (!maxValue[breakpoint].h >= val) return
    setLayouts(layout => produce(layout, draft => {
      const layIndex = draft[breakpoint].findIndex(fl => (fl.i === fieldKey))
      draft[breakpoint][layIndex].h = val
    }))
    setUpdateBtn({ unsaved: true })
  }
  return (
    <SimpleAccordion
      title="Sizes & Positions"
      className={css(FieldStyle.fieldSection)}
      open
    >
      <div className={css(s.fd)}>
        <label className={css(ut.w5, s.label)} htmlFor="x">
          <span className={css(s.name)}>X</span>
          <input aria-label="position x" placeholder="" max={maxValue[breakpoint].x} onChange={xHandler} value={fieldSize[0].x} className={css(ut.w8, s.input)} id="x" type="number" />
        </label>
        <label className={css(ut.w5, s.label)} htmlFor="w">
          <span className={css(s.name)}>W</span>
          <input aria-label="position w" placeholder="" max={maxValue[breakpoint].w} onChange={wHandler} value={fieldSize[0].w} className={css(ut.w8, s.input)} id="w" type="number" />
        </label>
        <label className={css(ut.w5, s.label)} htmlFor="y">
          <span className={css(s.name)}>Y</span>
          <input aria-label="position y" placeholder="" max={maxValue[breakpoint].y} onChange={yHandler} value={fieldSize[0].y} className={css(ut.w8, s.input)} id="y" type="number" />
        </label>
        <label className={css(ut.w5, s.label)} htmlFor="h">
          <span className={css(s.name)}>H</span>
          <input aria-label="position h" placeholder="" max={maxValue[breakpoint].h} onChange={hHandler} value={fieldSize[0].h} className={css(ut.w8, s.input)} id="h" type="number" />
        </label>
      </div>
    </SimpleAccordion>
  )
}

export default SizeAndPosition
const s = {
  fd: {
    flx: 'center',
    flxp: 1,
    m: 10,
  },
  label: {
    pn: 'relative',
    mb: 20,
  },
  name: {
    pn: 'absolute',
    tp: 8,
    lt: 10,
    fw: 500,
  },
  input: {
    pl: '30px !important',
    ta: 'center',
    oe: 'none !important',
    b: 'none !important',
    tn: 'background o.2s',
    brs: '8px !important',
    '&:hover': { bd: 'var(--white-0-81-32)' },
    '&:focus': { b: '1px solid var(--b-59) !important' },
  },
}
