const labelCssProps = {
  background: {
    'background-image': true,
    'background-position': true,
    'background-repeat': true,
    'background-size': true,
    'backdrop-filter': true,
  },
  border: {
    border: true,
    'border-width': true,
    'border-radius': true,
  },
  color: '',
  'font-size': '',
  'font-weight': '',
  'font-style': '',
  'text-align': '',
  'text-decoration': {
    'text-decoration-line': true,
    'text-decoration-style': true,
    'text-decoration-color': true,
    'text-decoration-thickness': true,
  },
  'text-shadow': '',
  'box-shadow': '',
  margin: '5px',
  padding: '5px',
  opacity: '100%',
  'line-height': '',
  'word-spacing': '',
  'letter-spacing': '',
  transition: '',
  'white-space': '',
  transform: '',
}
const iconCssProps = {
  border: {
    border: true,
    'border-width': true,
    'border-radius': true,
  },
  margin: '5px',
  padding: '5px',
  opacity: '100%',
  height: '',
  width: '',
  size: { width: '100%', height: '100%' },
  'box-shadow': '',
  filter: '',
  transition: '',
  background: {
    'background-image': true,
    'background-position': true,
    'background-repeat': true,
    'background-size': true,
    'backdrop-filter': true,
  },
}

const fieldWrpCssProps = {
  background: {
    'background-image': true,
    'background-position': true,
    'background-repeat': true,
    'background-size': true,
    'backdrop-filter': true,
  },
  'background-color': '',
  border: {
    border: true,
    'border-width': true,
    'border-radius': true,
  },
  margin: '5px',
  padding: '5px',
  opacity: '100%',
  'box-shadow': '',
  width: '',
  height: '',
  transform: '',
  transition: '',
}

const textFldCssProps = {
  'fld-wrp': {
    states: ['hover'],
    properties: {
      ...fieldWrpCssProps,
      'text-decoration': {
        'text-decoration-line': true,
        'text-decoration-style': true,
        'text-decoration-color': true,
        'text-decoration-thickness': true,
      },
    },
  },
  fld: {
    states: ['hover', 'focus'],
    properties: { ...fieldWrpCssProps },
  },
  'lbl-wrp': {
    states: ['hover'],
    properties: { ...fieldWrpCssProps },
  },
  lbl: {
    states: ['hover'],
    properties: { ...labelCssProps, 'white-space': '' },
  },
  'lbl-pre-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'lbl-suf-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'pre-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'suf-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'sub-titl': {
    states: ['hover'],
    properties: { ...labelCssProps },
  },
  'title-pre-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'title-suf-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'sub-titl-pre-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'sub-titl-suf-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'hlp-txt': {
    states: ['hover'],
    properties: { ...labelCssProps },
  },
  'hlp-txt-pre-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'hlp-txt-suf-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'err-msg': {
    states: ['hover'],
    properties: { ...labelCssProps },
  },
  'err-txt-pre-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
  'err-txt-suf-i': {
    states: ['hover'],
    properties: { ...iconCssProps },
  },
}

const buttonCssProps = {
  background: {
    'background-image': true,
    'background-position': true,
    'background-repeat': true,
    'background-size': true,
    'backdrop-filter': true,
  },
  border: {
    border: true,
    'border-width': true,
    'border-radius': true,
  },
  margin: '5px',
  padding: '5px',
  opacity: '100%',
  'box-shadow': '',
  'font-size': '',
  'font-weight': '',
  width: '',
  height: '',
  color: '',
  transition: '',
  'text-decoration': {
    'text-decoration-line': true,
    'text-decoration-style': true,
    'text-decoration-color': true,
    'text-decoration-thickness': true,
  },
}

const chackProps = {
  margin: '',
  padding: '',
  background: {
    'background-image': true,
    'background-position': true,
    'background-repeat': true,
    'background-size': true,
    'backdrop-filter': true,
  },
  border: {
    border: true,
    'border-width': true,
    'border-radius': true,
  },
  width: '',
  height: '',
  transition: '',
  shadow: '',
  color: '',
}
const formCommonCssProps = {
  background: '',
  color: '',
  padding: '5px',
  margin: '5px',
  border: {
    border: true,
    'border-width': true,
    'border-radius': true,
  },
  'box-shadow': '',
  transition: '',
}
const editorConfig = {
  'form-wrappers': {
    states: ['hover'],
    properties: { ...formCommonCssProps },
  },
  'form-containers': {
    states: ['hover'],
    properties: { ...formCommonCssProps },
  },
  'field-containers': {
    states: ['hover'],
    properties: {
      background: '',
      padding: '5px',
      margin: '5px',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      'box-shadow': '',
    },
  },
  'label-containers': {
    states: ['hover'],
    properties: {
      background: '',
      padding: '5px',
      margin: '5px',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      'box-shadow': '',
    },
  },
  label: {
    states: ['hover'],
    properties: {
      background: '',
      padding: '5px',
      margin: '5px',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      'box-shadow': '',
    },
  },
  'lbl-pre-i': {
    states: ['hover'],
    properties: {
      padding: '5px',
      margin: '5px',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      'box-shadow': '',
      height: '',
      width: '',
    },
  },
  'lbl-suf-i': {
    states: ['hover'],
    properties: {
      padding: '5px',
      margin: '5px',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      'box-shadow': '',
      height: '',
      width: '',
    },
  },
  subtitle: {
    states: ['hover'],
    properties: {
      'background-color': '',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      color: '',
      'font-size': '',
      'font-style': '',
      'font-weight': '',
      padding: '5px',
      margin: '5px',
      'box-shadow': '',
    },
  },
  'sub-titl-pre-i': {
    states: ['hover'],
    properties: {
      padding: '5px',
      margin: '5px',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      'box-shadow': '',
      height: '',
      width: '',
    },
  },
  'sub-titl-suf-i': {
    states: ['hover'],
    properties: {
      padding: '5px',
      margin: '5px',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      'box-shadow': '',
      height: '',
      width: '',
    },
  },
  'helper-text': {
    states: ['hover'],
    properties: {
      'background-color': '',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      color: '',
      'font-size': '',
      'font-style': '',
      'font-weight': '',
      padding: '5px',
      margin: '5px',
      'box-shadow': '',
    },
  },
  'hlp-txt-pre-i': {
    states: ['hover'],
    properties: {
      padding: '5px',
      margin: '5px',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      'box-shadow': '',
      height: '',
      width: '',
    },
  },
  'hlp-txt-suf-i': {
    states: ['hover'],
    properties: {
      padding: '5px',
      margin: '5px',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      'box-shadow': '',
      height: '',
      width: '',
    },
  },
  'error-messages': {
    states: ['hover'],
    properties: {
      'background-color': '',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      color: '',
      'font-size': '',
      'font-style': '',
      'font-weight': '',
      padding: '5px',
      margin: '5px',
      'box-shadow': '',
    },
  },
  'err-txt-pre-i': {
    states: ['hover'],
    properties: {
      padding: '5px',
      margin: '5px',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      'box-shadow': '',
      height: '',
      width: '',
    },
  },
  'err-txt-suf-i': {
    states: ['hover'],
    properties: {
      padding: '5px',
      margin: '5px',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      'box-shadow': '',
      height: '',
      width: '',
    },
  },
  'pre-i': {
    states: ['hover'],
    properties: {
      padding: '5px',
      margin: '5px',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      'box-shadow': '',
      height: '',
      width: '',
    },
  },
  'suf-i': {
    states: ['hover'],
    properties: {
      padding: '5px',
      margin: '5px',
      border: {
        border: true,
        'border-width': true,
        'border-radius': true,
      },
      'box-shadow': '',
      height: '',
      width: '',
    },
  },
  defaultProps: {
    margin: '0px',
    padding: '0px',
    border: '',
  },
  texfieldStyle: {
    states: ['hover'],
    properties: {
      background: {
        'background-image': true,
        'background-position': true,
        'background-repeat': true,
        'background-size': true,
        'backdrop-filter': true,
      },
      'background-color': '',
      color: '',
      'font-size': '',
      border: { width: true, color: true, radius: true },
      margin: '5px',
      padding: '5px',
      opacity: '100%',
      'text-align': '',
      'text-decoration': {
        'text-decoration-line': true,
        'text-decoration-style': true,
        'text-decoration-color': true,
        'text-decoration-thickness': true,
      },
      'text-shadow': '',
      'box-shadow': '',
      'border-radius': '',
      transition: '',
      filter: '',
      'font-weight': '',
      'font-style': '',
      'line-height': '',
      'word-spacing': '',
      'letter-spacing': '',
      'z-index': '',
      height: '',
      width: '',
      transform: '',
      'white-space': '',
      'word-wrap': '',
    },
  },
  text: { ...textFldCssProps },
  date: { ...textFldCssProps },
  number: { ...textFldCssProps },
  username: { ...textFldCssProps },
  textarea: { ...textFldCssProps },
  email: { ...textFldCssProps },
  check: {
    ...textFldCssProps,
    cw: {
      states: ['hover'],
      properties: { ...chackProps },
    },
    cc: {
      states: ['hover'],
      properties: { ...chackProps },
    },
    cl: {
      states: ['hover'],
      properties: {
        ...chackProps,
        'font-size': '',
        'font-weight': '',
        'font-style': '',
      },
    },
    ck: {
      states: ['hover', 'focus', 'checked'],
      properties: { ...chackProps },
    },
    ct: {
      states: ['hover', 'focus'],
      properties: {
        ...chackProps,
        'font-size': '',
        'font-weight': '',
        'font-style': '',
        'line-height': '',
        'word-spacing': '',
        'letter-spacing': '',
      },
    },

  },
  'decision-box': {
    ...textFldCssProps,
    cw: {
      states: ['hover'],
      properties: { ...chackProps },
    },
    cc: {
      states: ['hover'],
      properties: { ...chackProps },
    },
    cl: {
      states: ['hover'],
      properties: {
        ...chackProps,
        'font-size': '',
        'font-weight': '',
        'font-style': '',
      },
    },
    ck: {
      states: ['hover', 'focus', 'checked'],
      properties: { ...chackProps },
    },
    ct: {
      states: ['hover', 'focus'],
      properties: {
        ...chackProps,
        'font-size': '',
        'font-weight': '',
        'font-style': '',
        'line-height': '',
        'word-spacing': '',
        'letter-spacing': '',
      },
    },

  },
  radio: {
    ...textFldCssProps,
    cw: {
      states: ['hover'],
      properties: { ...chackProps },
    },
    cc: {
      states: ['hover'],
      properties: { ...chackProps },
    },
    cl: {
      states: ['hover'],
      properties: {
        ...chackProps,
        'font-size': '',
        'font-weight': '',
        'font-style': '',
      },
    },
    rdo: {
      states: ['hover', 'focus', 'checked'],
      properties: { ...chackProps },
    },
    ct: {
      states: ['hover', 'focus'],
      properties: {
        ...chackProps,
        'font-size': '',
        'font-weight': '',
        'font-style': '',
        'line-height': '',
        'word-spacing': '',
        'letter-spacing': '',
      },
    },

  },
  title: {
    'fld-wrp': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    logo: {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'titl-wrp': {
      states: ['hover'],
      properties: {
        ...fieldWrpCssProps,
        width: '',
      },
    },
    title: {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'sub-titl': {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'title-pre-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'title-suf-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'sub-titl-pre-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'sub-titl-suf-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
  },
  divider: {
    'fld-wrp': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    divider: {
      states: ['hover'],
      properties: {
        border: {
          'border-bottom': true,
          'border-width': true,
          'border-radius': true,
        },
        'border-image': {
          'border-image': true,
          'border-image-slice': true,
          'border-image-width': true,
          'border-image-outset': true,
          'border-image-repeat': true,
        },
        margin: '5px',
        opacity: '100%',
        'box-shadow': '',
        transition: '',
      },
    },
  },
  image: {
    'fld-wrp': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    img: {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
  },
  button: {
    'fld-wrp': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    btn: {
      states: ['hover', 'focus'],
      properties: { ...buttonCssProps },
    },
    'btn-pre-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'btn-suf-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'hlp-txt': {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'hlp-txt-pre-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'hlp-txt-suf-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
  },
  'advanced-file-up': {
    'fld-wrp': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    fld: {
      states: ['hover', 'focus'],
      properties: { ...fieldWrpCssProps },
    },
    'lbl-wrp': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    lbl: {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'lbl-pre-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'lbl-suf-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'err-msg': {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'err-txt-pre-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'err-txt-suf-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'fld-wrp .filepond--root': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    'fld-wrp .filepond--drop-label': {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'fld-wrp .filepond--label-action': {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'fld-wrp .filepond--panel-root': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    'fld-wrp .filepond--item-panel': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    'fld-wrp .filepond--file-action-button': {
      states: ['hover'],
      properties: { ...buttonCssProps },
    },
    'fld-wrp .filepond--drip-blob': {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'fld-wrp .filepond--file': {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
  },
  'file-up': {
    'fld-wrp': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    'lbl-wrp': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    lbl: {
      states: ['hover'],
      properties: { ...labelCssProps, 'white-space': '' },
    },
    'lbl-pre-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'lbl-suf-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'inp-btn': {
      states: ['hover', 'focus'],
      properties: { ...buttonCssProps },
    },
    'pre-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'file-up-wrpr': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    'btn-txt': {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'suf-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'file-select-status': {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'max-size-lbl': {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'files-list': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    'file-wrpr': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
    'file-preview': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'file-title': {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'file-size': {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'cross-btn': {
      states: ['hover'],
      properties: { ...buttonCssProps },
    },

    'err-msg': {
      states: ['hover'],
      properties: { ...labelCssProps },
    },
    'err-txt-pre-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
    'err-txt-suf-i': {
      states: ['hover'],
      properties: { ...iconCssProps },
    },
  },
  html: {
    'fld-wrp': {
      states: ['hover'],
      properties: { ...fieldWrpCssProps },
    },
  },
  currency: {
    ...textFldCssProps,
    'currency-fld-wrp': {
      states: ['hover', 'focus'],
      properties: {
        border: {
          border: true,
          'border-width': true,
          'border-radius': true,
        },
        transition: '',
      },
    },
    'selected-currency-img': {
      states: [],
      properties: {
        border: {
          border: true,
          'border-width': true,
          'border-radius': true,
        },
        height: '',
        width: '',
        margin: '',
        padding: '',
        'box-shadow': '',
        'backgound-color': '',
      },
    },
    'opt-search-input': {
      states: ['hover', 'focus'],
      properties: {
        border: {
          border: true,
          'border-width': true,
          'border-radius': true,
        },
        width: '',
        margin: '',
        padding: '',
        'box-shadow': '',
        height: '',
        'background-color': '',
        'font-size': '',
        'font-style': '',
        'font-weight': '',
        transition: '',
      },
    },
    'opt-search-icn': {
      states: ['hover'],
      properties: {
        border: {
          border: true,
          'border-width': true,
          'border-radius': true,
        },
        margin: '',
        padding: '',
        'background-color': '',
        stroke: '',
        filter: '',
      },
    },
    'input-clear-btn': {
      states: ['hover', 'focus'],
      properties: {
        border: {
          border: true,
          'border-width': true,
          'border-radius': true,
        },
        margin: '',
        padding: '',
        'background-color': '',
        background: '',
        width: '',
        height: '',
        filter: '',
      },
    },
    'search-clear-btn': {
      states: ['hover', 'focus'],
      properties: {
        border: {
          border: true,
          'border-width': true,
          'border-radius': true,
        },
        margin: '',
        padding: '',
        'background-color': '',
        stroke: '',
        width: '',
        height: '',
        filter: '',
      },
    },
    option: {
      states: ['hover', 'focus'],
      properties: {
        border: {
          border: true,
          'border-width': true,
          'border-radius': true,
        },
        margin: '',
        padding: '',
        'background-color': '',
        width: '',
        height: '',
        'box-shadow': '',
      },
    },
    'opt-icn': {
      states: [],
      properties: {
        border: {
          border: true,
          'border-width': true,
          'border-radius': true,
        },
        margin: '',
        padding: '',
        width: '',
        height: '',
        'box-shadow': '',
        filter: '',
      },
    },
    'opt-lbl': {
      states: [],
      properties: {
        border: {
          border: true,
          'border-width': true,
          'border-radius': true,
        },
        margin: '',
        padding: '',
        width: '',
        height: '',
        'box-shadow': '',
        'backgound-color': '',
        'font-size': '',
        'font-weight': '',
        'font-style': '',
        color: '',
      },
    },
    'opt-suffix': {
      states: [],
      properties: {
        border: {
          border: true,
          'border-width': true,
          'border-radius': true,
        },
        margin: '',
        padding: '',
        width: '',
        height: '',
        'box-shadow': '',
        'backgound-color': '',
        'font-size': '',
        'font-weight': '',
        'font-style': '',
        color: '',
      },
    },
  },
}
export default editorConfig
