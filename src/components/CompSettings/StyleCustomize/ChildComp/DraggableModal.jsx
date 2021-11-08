import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $draggableModal } from '../../../../GlobalStates'
import CloseIcn from '../../../../Icons/CloseIcn'
import ut from '../../../../styles/2.utilities'
import draggableModalStyle from '../../../../styles/draggableModal.style'
import LabelControlMenu from '../../../style-new/LabelControlMenu'
import SpacingControlMenu from '../../../style-new/SpacingControlMenu'

const BorderStyle = lazy(() => import('./BorderStyle'))
const SimpleColorPickerMenu = lazy(() => import('../../../style-new/SimpleColorPickerMenu'))
const FontPickerMenu = lazy(() => import('../../../style-new/FontPickerMenu'))

const RenderComponent = ({ component, action, value }) => {
  switch (component) {
    case 'border-style': return <BorderStyle />
    case 'color-picker': return <SimpleColorPickerMenu action={action} value={value} />
    case 'font': return <FontPickerMenu />
    case 'label-control': return <LabelControlMenu />
    case 'spacing-control': return <SpacingControlMenu />
    default: return 'loading'
  }
}
const setTitle = (component) => {
  switch (component) {
    case 'border-style': return 'Border'
    case 'color-picker': return 'Color picker'
    case 'font': return 'Fonts'
    case 'label-control': return 'Label Placement Control'
    case 'spacing-control': return 'Label Spacing Control'
    default: return '...'
  }
}

export default function DraggableModal() {
  const { css } = useFela()
  const [draggableModal, setDraggableModal] = useRecoilState($draggableModal)
  const { show, position, component, width, subtitle, action, value } = draggableModal
  const [pos, setPos] = useState('')
  const dragableRef = useRef(null)
  useEffect(() => {
    setPos({ ...position })
    // console.log('ref', dragableRef.current.props.children)
  }, [position])

  const DragableModalLoader = () => (
    <>
      <div title="Loading..." className={css(ut.flxcb, ut.mb2)}>
        <div title="Loading..." className={`${css({ w: 70, h: 15, brs: 5 })} loader`} />
        <div title="Loading..." className={`${css({ w: 80, h: 30, brs: 5 })} loader`} />
      </div>
      <div title="Loading..." className={css(ut.flxcb)}>
        <div title="Loading..." className={`${css({ w: 70, h: 15, brs: 5 })} loader`} />
        <div title="Loading..." className={`${css({ w: 80, h: 30, brs: 5 })} loader`} />
      </div>
    </>
  )

  if (!show) return <></>

  return (
    <Draggable ref={dragableRef} handle=".draggable-modal-handler" bounds="parent" position={pos !== null ? position : pos} onMouseDown={() => setPos(null)}>
      <div className={css(draggableModalStyle.container)} style={{ width, ...pos && { transition: 'transform .2s' } }}>
        {/* style={{ top: position?.y, right: position?.x, display: show ? 'block' : 'none', width }} */}
        <div className={`${css([ut.flxb, draggableModalStyle.titleBar])} draggable-modal-handler`}>
          <div className={css(ut.flxClm, draggableModalStyle.titleContainer)}>
            <span className={css(draggableModalStyle.title)}>{setTitle(component)}</span>
            <span className={css(ut.fontBody, { fs: 10, mx: 3, cr: 'var(--white-0-50)' })}>{subtitle}</span>
          </div>
          <button type="button" className={css(draggableModalStyle.button)} onClick={() => setDraggableModal({ show: false })}>
            <CloseIcn size={10} />
          </button>
        </div>
        <hr className={css(draggableModalStyle.hr)} />
        <div className={css(draggableModalStyle.content)}>
          <Suspense fallback={<DragableModalLoader />}>
            <RenderComponent component={component} action={action} value={value} />
          </Suspense>
        </div>
      </div>
    </Draggable>
  )
}
