const Toolbars = {
  toolbar_wrp: {
    bd: 'var(--white-100)',
    h: '100%',
    ow: 'hidden',
    mxw: 190,
    mnw: 55,
    px: 14,
    pt: 14,
    pb: 35,
    tn: 'width 500ms',
  },
  fields_search: {
    pn: 'relative',
    mb: 15,
  },
  search_field: {
    w: '100%',
    oe: 'none',
    b: '1px solid var(--white-0-75) !important',
    brs: '9px !important',
    pl: '32px !important',
    '&:focus': {
      bs: '0px 0px 0px 3px var(--b-100-64-40) !important',
      bcr: 'var(--b-92-62) !important',
    },
  },
  search_icn: {
    pn: 'absolute',
    tp: '50%',
    mx: 8,
    tm: 'translateY(-50%)',
    cr: 'var(--white-0-75)',
    cur: 'pointer',
    '& svg': { dy: 'block' },
  },
  sec_acc: {
    mb: 15,
    cr: 'var(--white-0-50)',
    '& .title': { fw: 400 },
    '& .btgl': { cur: 'pointer !important' },
  },

  tool_bar: {
    dy: 'flex',
    flxp: 'wrap',
    // mxh: 200,
    owy: 'scroll',
    px: 2,
    py: 5,
  },
  tool: {
    flx: 'align-center',
    bd: 'var(--white)',
    cr: 'var(--dp-blue)',
    fw: 500,
    fs: 15,
    ws: 'nowrap',
    wb: 'keep-all',
    w: 156,
    h: 55,
    p: 15,
    b: '1px solid var(--white-0-75)',
    brs: 15,
    cur: 'grab',
    ow: 'hidden',
    m: '5px 0',
    bs: '0 1px 3px hsla(var(--blue-h), var(--black-s), var(--black-l), 0.2)',
    t: 'all 200ms',
  },
  tool_icn: {
    dy: 'flex',
    cr: 'var(--dp-blue)',
    fs: 25,
    mr: 10,
  },
}

export default Toolbars
