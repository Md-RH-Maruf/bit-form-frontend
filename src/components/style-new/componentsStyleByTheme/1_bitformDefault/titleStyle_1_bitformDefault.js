/* eslint-disable camelcase */
export default function titleStyle_1_bitformDefault({ fk, type, direction }) {
  return {
    [`.${fk}-fld-wrp`]: {
      height: '100%',
      display: 'flex',
      'justify-content': 'center',
      'flex-direction': 'row',
      'align-items': 'center',
    },
    [`.${fk}-fld-wrp.fld-hide::after`]: {
      position: 'absolute',
      top: 0,
      left: 0,
      content: '""',
      width: '100%',
      height: '100%',
      'background-color': 'rgba(0, 0, 0, 0.2)',
    },
    [`.${fk}-titl-wrp`]: { padding: '0px 5px' },
    [`.${fk}-title`]: {
      margin: '5px',
      'text-align': 'center',
      'word-break': 'break-all',
    },
    [`.${fk}-sub-titl`]: {
      margin: '5px',
      'text-align': 'center',
      'word-break': 'break-all',
    },
    [`.${fk}-logo`]: {
      margin: '5px',
      width: '50px',
      height: '50px',
    },
    [`.${fk}-title-pre-i`]: {
      width: '20px',
      height: '20px',
    },
    [`.${fk}-title-suf-i`]: {
      width: '20px',
      height: '20px',
    },
    [`.${fk}-sub-titl-pre-i`]: {
      width: '20px',
      height: '20px',
    },
    [`.${fk}-sub-titl-suf-i`]: {
      width: '20px',
      height: '20px',
    },
  }
}
