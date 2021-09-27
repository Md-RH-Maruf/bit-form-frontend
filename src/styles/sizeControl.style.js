const sizeControlStyle = {
  container: {
    b: '1px solid #ddd',
    brs: 10,
    flx: 'align-center',
    h: 30,
    p: 3,
    bc: 'var(--white-0-95)',
  },

  input: {
    jc: 'space-between !important',

    ':hover': {
      b: '1px solid transparent',

      '& > div > input:first-child': { bc: 'transparent !important' },
      '& button': { dy: 'none' },
    },

    '& > span:first-child': { w: '20%', p: 0 },

    '& > div': { w: '70%' },
    '& > div > input:first-child': { pr: '0px !important' },
  },

  selectt: {
    // '-webkit-appearance': 'none !important',
    // '-moz-appearance': 'none !important',
    // appearance: 'none !important',
    bi: 'none !important',
    all: 'unset',
    'border-top-left-radius': '0 !important',
    'border-bottom-left-radius': '0 !important',
    bl: '1px solid var(--white-0-75)',
    p: '0px !important',
    pr: '3px !important',
    pl: '3px !important',
    bc: 'var(--white-0-95) !important',
    lh: '1 !important',
    mnh: '18px !important',
    h: 18,

    // '&::-ms-expand': { display: 'none !important' },
    '&:focus': { bs: 'none !important' },

  },
}

export default sizeControlStyle
