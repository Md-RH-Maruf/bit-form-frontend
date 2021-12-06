import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $draggableModal } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import ColorPreview from './ColorPreview'
import { showDraggableModal, splitValueBySpaces } from './styleHelpers'

export default function BorderControl({ subtitle, value, objectPaths, id }) {
  const { css } = useFela()

  const [, color] = splitValueBySpaces(value)
  const [draggableModel, setDraggableModal] = useRecoilState($draggableModal)

  return (
    <div className={css(c.preview_wrp, draggableModel.id === id && c.active)}>
      <button
        onClick={e => showDraggableModal(e, setDraggableModal, { component: 'border-style', subtitle, objectPaths, id })}
        type="button"
        className={css(c.pickrBtn)}
      >
        <ColorPreview bg={color} h={25} w={25} className={css(ut.mr2)} />
        <span className={css(c.clrVal)}>{value}</span>
      </button>
    </div>
  )
}

const c = {
  preview_wrp: {
    bd: 'var(--white-0-95)',
    w: 130,
    mnw: 130,
    brs: 10,
    p: 3,
    flx: 'center-between',
  },
  preview: {
    w: 25,
    h: 25,
    b: '1px solid gray',
    brs: 7,
    curp: 1,
    mr: 7,
  },
  clearBtn: {
    brs: '50%',
    w: 20,
    h: 20,
    b: 'none',
    flx: 'center',
    bd: 'transparent',
    cr: 'var(--white-0-50)',
    curp: 1,
    ':hover': { cr: 'var(--black-0)' },
  },
  pickrBtn: {
    b: 'none',
    curp: 1,
    flx: 'center',
    bd: 'transparent',
    p: 0,
  },
  clrVal: {
    w: 90,
    ws: 'nowrap',
    textOverflow: 'ellipsis',
    ow: 'hidden',
    ta: 'left',
  },
  active: { focusShadow: 1 },
}
