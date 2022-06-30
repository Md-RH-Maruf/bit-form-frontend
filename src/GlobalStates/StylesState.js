import merge from 'deepmerge-alt'
import { atom, selector } from 'recoil'
import { $breakpoint } from './GlobalStates'

export const $tempStyles = atom({
  key: '$tempStyles',
  default: {
    themeVars: {},
    lightThemeColors: {},
    darkThemeColors: {},
    styles: {},
  },
})

export const $stylesLg = atom({
  key: '$stylesLg',
  default: {
    theme: 'bitformDefault',
    fieldSizes: 'medium',
    font: {
      fontType: '',
      fontURL: '',
      fontWeightVariants: [],
      fontStyle: [],
    },
    form: {
      light: {
        // _frm: { 'background-color': 'var(--global-bg-color)' },
        // '_frm-bg': {
        //   padding: '10px',
        //   border: 'solid hsla(215, 20%, 93%, 100%)',
        //   'border-width': '1px',
        // },
      },
      dark: {
        // _frm: { 'background-color': 'var(--global-bg-color)' },
        // '_frm-bg': { padding: '10px' },
      },
    },
    fields: {},
  },
})
export const $stylesMd = atom({ key: '$stylesMd', default: {} })
export const $stylesSm = atom({ key: '$stylesSm', default: {} })

export const $styles = selector({
  key: '$styles',
  get: ({ get }) => {
    const breakpoint = get($breakpoint)
    if (breakpoint === 'md') return merge(get($stylesLg), get($stylesMd))
    if (breakpoint === 'sm') return merge(get($stylesLg), get($stylesSm))
    return get($stylesLg)
  },
  set: ({ set, get }, newStyles) => {
    const breakpoint = get($breakpoint)
    if (breakpoint === 'md') set($stylesMd, newStyles)
    else if (breakpoint === 'sm') set($stylesSm, newStyles)
    else set($stylesLg, newStyles)
  },
})
