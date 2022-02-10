/* eslint-disable camelcase */
export default function imageStyle_1_bitformDefault({ fk, type, direction }) {
  return {
    [`.${fk}-fld-wrp`]:
      { height: '100%', width: '100%' },
    [`.${fk}-fld-wrp.fld-hide::after`]: {
      position: 'absolute',
      top: 0,
      left: 0,
      content: '""',
      width: '100%',
      height: '100%',
      'background-color': 'rgba(0, 0, 0, 0.2)',
    },
    [`.${fk}-img`]:
    {
      width: '100%',
      height: '100%',
    },
  }
}
