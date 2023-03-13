const style = {
  integWrp: {
    mt: 8,
    dy: 'flex',
    ai: 'start',
    flxp: 1,
    gap: '5px',
  },
  itegCard: {
    w: 240,
    b: '2px solid #e3eff8 ',
    brs: 13,
    p: 8,
    pn: 'relative',
    tn: 'border .2s, transform .2s',
    ':hover': {
      tm: 'translateY(-3px)',
      bcr: 'var(--blue)',
      '& .action-wrp': { dy: 'inline-block!important' },
    },
    ':focus-within': {
      tm: 'translateY(-3px)',
      bcr: 'var(--blue)',
      '& .action-wrp': { dy: 'inline-block!important' },
    },
    mnh: 145,
    mr: 20,
  },
  integPlus: {
    flx: 'center',
    curp: 1,
    h: 125,
    cr: 'var(--b-49-79)',
    ':hover': { cr: 'var(--blue)' },
  },
  integLogo: {
    w: 80,
    h: 80,
    b: '1px solid #e3eff8',
    brs: 8,
    p: 5,
  },
  integTitle: {
    fs: 15,
    dy: 'block',
    fw: 500,
    cr: 'var(--dp-blue)',
    m: 0,
    ':hover': { cr: 'var(--blue)' },
    ':focus-visible': { focusOutline: 1 },

  },
  integSubtitle: {
    fs: 12,
    cr: 'var(--b-11-50)',
  },
  actionWrp: {
    pn: 'absolute',
    tp: 5,
    rt: 5,
    p: 5,
    dy: 'none',
  },
  actionBtn: {
    se: 30,
    flxi: 'center',
    b: 'none',
    brs: '50%',
    p: 5,
    curp: 1,
    bd: 'none',
    cr: 'var(--blue)',
    oe: 'none',
    ':hover': { bd: 'var(--b-49-91)' },
    ':focus-visible': { focusOutline: 1 },
  },
  thumb: {
    w: 120,
    h: 150,
    brs: 12,
    flxi: 'center',
    fd: 'column',
    b: '2px solid #e3eff8',
    ow: 'hidden',
    m: 10,
    tn: 'border .2s, transform .2s',
    curp: 1,
    pn: 'relative',
    ':hover': {
      tm: 'translateY(-2px)',
      bcr: 'var(--blue)',
      '& .action-wrp': { dy: 'inline-block!important' },
    },
    ':focus-within': {
      tm: 'translateY(-2px)',
      bcr: 'var(--blue)',
      '& .action-wrp': { dy: 'inline-block!important' },
    },
  },
  thumbTitle: {
    bd: 'hsl(240deg 85% 97%)',
    w: '105%',
    py: 5,
    fs: 12,
    ta: 'center',
  },
  thumbImg: {
    mxw: '100px !important',
    mxh: '100px !important',
    m: 'auto',
    p: 12,
  },
  thumbPro: {
    w: '100%',
    h: '100%',
    pn: 'absolute',
    brs: 10,
    bd: '#001e3850',
    flx: 'center',
    fr: 'drop-shadow(0 2px 1px black)',
  },
  thumbProTxt: {
    fs: 14,
    fw: 500,
    cr: 'var(--white)',
    ta: 'center',
    ':hover': {
      textDecoration: 'underline',
      cr: 'hsl(214deg 100% 88%)',
    },
  },
  integCardDisabled: {
    pe: 'none',
    us: 'none',
    '&>img': { fr: 'grayscale(1) !important' },
    '&::before': {
      flx: 'center',
      bd: 'var(--b-63-18-67)',
      pn: 'absolute',
      zx: 9,
      ct: 'Comming Soon',
      fs: 12,
      fw: 500,
      ts: '0px 0px 4px va(--black-0)',
      w: '100%',
      h: '100%',
    },
  },
}
export default style
