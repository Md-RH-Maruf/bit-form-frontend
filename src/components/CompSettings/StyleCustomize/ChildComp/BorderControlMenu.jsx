import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $styles } from '../../../../GlobalStates/StylesState'
import { $themeVars } from '../../../../GlobalStates/ThemeVarsState'
import ChevronDownIcn from '../../../../Icons/ChevronDownIcn'
import ut from '../../../../styles/2.utilities'
import { getElmDataBasedOnElement } from '../../../../Utils/Helpers'
import editorConfig from '../../../style-new/NewStyleEditorConfig'
import SimpleColorPickerTooltip from '../../../style-new/SimpleColorPickerTooltip'
import { getObjByKey, getValueByObjPath, setStyleStateObj } from '../../../style-new/styleHelpers'
import SimpleDropdown from '../../../Utilities/SimpleDropdown'
import SpaceControl from './SpaceControl'

export default function BorderControlMenu({ objectPaths, state = '' }) {
  const { css } = useFela()
  // -- apply for temp test
  const { fieldKey, element } = useParams()

  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [styles, setStyles] = useRecoilState($styles)

  const { object, borderObjName, paths } = objectPaths

  const stateObj = getObjByKey(object, { themeVars, styles })

  // -- apply for temp test
  const fldStyleObj = styles?.fields?.[fieldKey]
  if (!fldStyleObj) { console.error('no style object found according to this field'); return <></> }
  const { fieldType } = fldStyleObj
  const { elementKey, classKey } = getElmDataBasedOnElement(element)
  const borderPropObj = editorConfig[fieldType][elementKey].properties.border
  const borderPropKeys = Object.keys(borderPropObj)
  const border = getValueByObjPath(stateObj, paths[borderPropKeys[0]])
  const borderColor = getValueByObjPath(stateObj, paths[borderPropKeys[1]])
  const borderWidth = getValueByObjPath(stateObj, paths.borderWidth)
  const borderRadius = getValueByObjPath(stateObj, paths?.borderRadius)

  const onSizeChange = (pathName, val) => {
    setStyleStateObj(object, pathName, val, { setThemeVars, setStyles })
  }

  const options = [
    { icn: <ChevronDownIcn size={12} />, label: 'Solid', value: 'solid' },
    { icn: <ChevronDownIcn size={12} />, label: 'Dashed', value: 'dashed' },
    { icn: <ChevronDownIcn size={12} />, label: 'Dotted', value: 'dotted' },
    { icn: <ChevronDownIcn size={12} />, label: 'Double', value: 'double' },
    { icn: <ChevronDownIcn size={12} />, label: 'Groove', value: 'groove' },
    { icn: <ChevronDownIcn size={12} />, label: 'Ridge', value: 'ridge' },
    { icn: <ChevronDownIcn size={12} />, label: 'Inset', value: 'inset' },
    { icn: <ChevronDownIcn size={12} />, label: 'Outset', value: 'outset' },
    { icn: <ChevronDownIcn size={12} />, label: 'None', value: 'none' },
  ]

  return (
    <>
      {borderPropObj[borderPropKeys[0]] && (
        <div className={css(ut.flxcb, ut.mb2)}>
          <span className={css(ut.fs12, ut.fw500)}>Type</span>
          <SimpleDropdown
            options={options}
            value={border}
            onChange={val => onSizeChange(paths[borderPropKeys[0]], val)}
            w={130}
            h={30}
          />
        </div>
      )}
      {borderPropObj[borderPropKeys[1]] && (
        <div className={css(ut.flxcb, ut.mb2)}>
          <span className={css(ut.fs12, ut.fs12, ut.fw500)}>Color</span>
          <SimpleColorPickerTooltip
            action={{ onChange: val => onSizeChange(paths[borderPropKeys[1]], val) }}
            value={borderColor}
          />
        </div>
      )}

      {paths.borderWidth && (
        <SpaceControl
          value={borderWidth}
          className={css(ut.mb2)}
          onChange={val => onSizeChange(paths.borderWidth, val)}
          title="Width"
          unitOption={['px', 'em', 'rem']}
          min="0"
          max="10"
          width="128px"
        />
      )}

      {paths.borderRadius && (
        <SpaceControl
          value={borderRadius}
          className={css(ut.mb2)}
          onChange={val => onSizeChange(paths.borderRadius, val)}
          title="Radius"
          unitOption={['px', 'em', 'rem', '%']}
          min="0"
          max="20"
          width="128px"
        />
      )}
    </>
  )
}
