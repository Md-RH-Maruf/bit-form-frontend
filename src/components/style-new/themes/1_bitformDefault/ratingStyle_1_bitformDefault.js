/* eslint-disable object-curly-newline */
import inputWrapperClasses from '../common/inputWrapperClasses'

/* eslint-disable camelcase */
export default function ratingStyle_1_bitformDefault({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      ...inputWrapperClasses(fk),

      [`.${fk}-inp-fld-wrp`]: {
        // position: 'relative',
        margin: 'var(--fld-m, 0)',
        height: '50px',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'start',
        gap: '10px',
      },

      [`.${fk}-rating-msg`]: {
        // text color
        'font-size': 'var(--fld-fs) !important',
        color: 'var(--global-font-color) !important',
        'font-family': 'inherit',
      },

      [`.${fk}-rating-input`]: {
        display: 'none',
      },

      [`.${fk}-rating-wrp`]: {
        display: 'flex',
        // 'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'start',
      },

      [`.${fk}-rating-img`]: {
        width: '40px',
        height: '40px',
        filter: 'invert(95%) sepia(12%) saturate(155%) hue-rotate(6deg) brightness(85%) contrast(84%);',
      },

      [`.${fk}-rating-img.${fk}-rating-hover`]: {
        transition: 'filter 0.3s ease-in-out',
        filter: 'invert(73%) sepia(30%) saturate(3712%) hue-rotate(3deg) brightness(108%) contrast(96%)',
      },

      [`.${fk}-rating-img.${fk}-rating-selected`]: {
        filter: 'invert(76%) sepia(40%) saturate(5950%) hue-rotate(12deg) brightness(96%) contrast(98%)',
      },

      // [`.${fk}-rating-img.${fk}-rating-is-selected`]: {
      //   filter: 'invert(76%) sepia(40%) saturate(5950%) hue-rotate(12deg) brightness(96%) contrast(98%)',
      // },
    }
  }
  return {}
}
