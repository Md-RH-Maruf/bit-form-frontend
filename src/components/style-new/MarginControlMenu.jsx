/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $tempStyles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import SpaceControl from '../CompSettings/StyleCustomize/ChildComp/SpaceControl'

export default function MarginControlMenu() {
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const { '--fld-m': fidMargin } = themeVars
  const tempStyle = useRecoilValue($tempStyles)
  const tempThemeVars = tempStyle.themeVars

  const fieldMarginHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--fld-m'] = `${v}`
    }))
  }

  const undoHandler = (value) => {
    if (!tempThemeVars[value]) return
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle[value] = tempThemeVars[value] || '0px'
    }))
  }
  return (
    <SpaceControl isResetable={tempThemeVars['--fld-m']} undoHandler={() => undoHandler('--fld-m')} value={fidMargin} title="Field Margin" onChange={val => fieldMarginHandler(val)} unitOption={['px', 'em', 'rem']} />
  )
}
