import { useRecoilValue } from 'recoil'
import { $breakpoint, $flags } from '../../GlobalStates/GlobalStates'
import { getCustomClsName } from '../../Utils/globalHelpers'
import RenderStyle from '../style-new/RenderStyle'

function Divider({ fieldKey, styleClasses, attr: fieldData }) {
  const breakpoint = useRecoilValue($breakpoint)
  const { styleMode } = useRecoilValue($flags)
  const isHidden = fieldData.hidden?.includes(breakpoint) || false
  return (
    <>
      <RenderStyle styleClasses={styleClasses} />
      <div data-dev-fld-wrp={fieldKey} className={`${fieldKey}-fld-wrp drag ${styleMode ? '' : 'drag'} ${isHidden ? 'fld-hide' : ''} ${getCustomClsName(fieldKey, 'fld-wrp')}`}>
        <div data-dev-divider={fieldKey} className={`${fieldKey}-divider ${getCustomClsName(fieldKey, 'divider')}`} />
      </div>
    </>
  )
}
export default Divider
