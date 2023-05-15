/* eslint-disable camelcase */
export default function stripeStyle_1_BitformDefault({ fk, breakpoint, colorScheme }) {
  if (breakpoint === 'lg' && colorScheme === 'light') {
    return {
      [`.${fk}-fld-wrp`]: {
        display: 'var(--fld-wrp-dis, block)',
        'flex-direction': 'var(--fld-wrp-fdir, row)',
        'background-color': 'var(--fld-wrp-bg, transparent)',
        padding: 'var(--fld-wrp-p, 0)',
        margin: 'var(--fld-wrp-m, 0)',
        position: 'relative',
        'box-shadow': 'var(--fld-wrp-sh, none)',
        'border-style': 'var(--fld-wrp-bdr, medium)',
        'border-color': 'var(--fld-wrp-bdr-clr, none)',
        'border-radius': 'var(--fld-wrp-bdr-rad, 0)',
        'border-width': 'var(--fld-wrp-bdr-width, 0)',
      },

      [`.${fk}-inp-wrp`]: { position: 'relative', margin: 'var(--fld-m, 0)' },

      [`.${fk}-stripe-wrp`]: {
        width: '100%',
        'min-width': '150px',
        'max-width': '750px',
        // margin: 'auto',
      },
      [`.${fk}-stripe-btn`]: {
        'font-size': 'var(--btn-fs)!important',
        padding: 'var(--btn-p)!important',
        // 'background-color': 'var(--btn-bgc)',
        background: 'var(--btn-bg)',
        color: 'var(--btn-c)',
        'font-weight': 'var(--btn-fw)',
        'border-style': 'var(--btn-bdr)',
        'border-color': 'var(--btn-bdr-clr)',
        'border-width': 'var(--btn-bdr-width)',
        'border-radius': 'var(--btn-bdr-rad) !important',
        'box-shadow': 'var(--btn-sh)',
        cursor: 'pointer',
        'font-family': 'inherit',
        'font-style': 'var(--btn-f-style)',
        'line-height': '1',
        margin: 'var(--btn-m)',
        outline: 'none',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        transition: 'background-color 0.2s, transform 0.2s',
      },
      [`.${fk}-stripe-fld`]: {
        margin: '10px 0px',
      },
      [`.${fk}-stripe-fld .strip-pay-btn`]: {
        width: '100%',
        'font-size': 'var(--btn-fs)!important',
        padding: 'var(--btn-p)!important',
        // 'background-color': 'var(--btn-bgc)',
        background: 'var(--btn-bg)',
        color: 'var(--btn-c)',
        'font-weight': 'var(--btn-fw)',
        'border-style': 'var(--btn-bdr)',
        'border-color': 'var(--btn-bdr-clr)',
        'border-width': 'var(--btn-bdr-width)',
        'border-radius': '20px !important',
        'box-shadow': 'var(--btn-sh)',
        cursor: 'pointer',
        'font-family': 'inherit',
        'font-style': 'var(--btn-f-style)',
        'line-height': '1',
        'margin-top': '15px',
        outline: 'none',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        transition: 'background-color 0.2s, transform 0.2s',
      },

    }
  }
  return {}
}
