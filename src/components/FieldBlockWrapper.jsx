import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import BrushIcn from '../Icons/BrushIcn'
import ChevronDownIcn from '../Icons/ChevronDownIcn'
import EditIcn from '../Icons/EditIcn'
import MoveIcn from '../Icons/MoveIcn'
import { AppSettings } from '../Utils/AppSettingsContext'
import { deepCopy } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'
import FieldContextMenu from './FieldContextMenu'
import FieldDeleteButton from './FieldDeleteButton'
import MapComponents from './MapComponents'
import Downmenu from './Utilities/Downmenu'

export default function FieldBlockWrapper({ layoutItem, removeLayoutItem, cloneLayoutItem, fields, formID }) {
  const history = useHistory()
  const { reCaptchaV2 } = useContext(AppSettings)
  const [show, setShow] = useState(false)

  const navigateToFieldSettings = () => {
    history.replace(history.location.pathname.replace(/style\/.+|style/g, 'fs'))
  }

  const navigateToStyle = typ => {
    if (typ === 'paypal') history.replace(history.location.pathname.replace(/fs|style\/.+|style/g, 'style/fl/ppl'))
    // if (/text|textarea|number|password|email|url|date|time|week|month|datetime-local|/g.test(typ){
    else history.replace(history.location.pathname.replace(/fs|style\/.+/g, 'style'))
  }

  const ComponentsByTheme = () => {
    const componentProps = deepCopy(fields[layoutItem.i])
    // TODO move this code with recaptcha component after remove react frontend
    if (componentProps && componentProps.typ === 'recaptcha') {
      componentProps.siteKey = reCaptchaV2.siteKey
    }
    return <MapComponents isBuilder formID={formID} atts={componentProps} fieldKey={layoutItem.i} />
  }

  const showContextMenu = e => {
    e.preventDefault()
    setShow({ x: e.pageX, y: e.pageY })
    console.log('right click')
  }

  return (
    <div onContextMenuCapture={showContextMenu}>
      <FieldContextMenu
        layoutItem={layoutItem}
        navigateToFieldSettings={navigateToFieldSettings}
        navigateToStyle={navigateToStyle}
        cloneLayoutItem={cloneLayoutItem}
        removeLayoutItem={removeLayoutItem}
      />
      <div className="blk-icn-wrp pos-abs flx">
        <button
          type="button"
          className="drag g-c us-n blk-wrp-btn"
          style={{ cursor: 'move' }}
          title={__('Move', 'bitform')}
        >
          <MoveIcn size="20" stroke="2" />
        </button>
        <button
          type="button"
          className="g-c cp us-n no-drg blk-wrp-btn"
          title={__('Style', 'bitform')}
          onClick={() => navigateToStyle(fields[layoutItem.i].typ)}
        >
          <BrushIcn height="18" width="14" />
        </button>
        <button
          type="button"
          className="g-c cp us-n no-drg blk-wrp-btn"
          title={__('Settings', 'bitform')}
          onClick={navigateToFieldSettings}
        >
          <EditIcn size="20" />
        </button>
        <FieldDeleteButton className="g-c us-n no-drg blk-wrp-btn" removeLayoutItem={removeLayoutItem} fieldId={layoutItem.i} />
        <Downmenu>
          <button
            data-close
            type="button"
            className="g-c us-n no-drg blk-wrp-btn"
            unselectable="on"
            draggable="false"
            style={{ cursor: 'pointer' }}
            title={__('More Options', 'bitform')}
          >
            <ChevronDownIcn size="19" />
          </button>
          <FieldContextMenu
            layoutItem={layoutItem}
            navigateToFieldSettings={navigateToFieldSettings}
            navigateToStyle={navigateToStyle}
            cloneLayoutItem={cloneLayoutItem}
            removeLayoutItem={removeLayoutItem}
          />
        </Downmenu>
      </div>
      <ComponentsByTheme />
    </div>
  )
}
