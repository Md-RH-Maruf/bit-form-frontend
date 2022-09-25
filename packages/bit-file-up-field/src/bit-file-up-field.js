/* eslint-disable class-methods-use-this */
export default class BitFileUpField {
  #fileUploadWrap = null

  #fieldLabel = null

  #inpBtn = null

  #fileSelectStatus = null

  #maxSizeLabel = null

  #fileUploadInput = null

  #filesList = null

  #errorWrap = null

  #files = {}

  #allEventListeners = []

  #document = null

  #window = {}

  #assetsURL = ''

  // default config
  #config = {
    id: 'upload',
    name: 'upload',
    required: true,
    multiple: false,
    maxSize: 0,
    sizeUnit: 'KB',
    isItTotalMax: false,
    showMaxSize: true,
    showSelectStatus: true,
    fileSelectStatus: 'No Choosen File',
    allowedFileType: '',
    showFileList: true,
    showFilePreview: true,
    showFileSize: true,
    accept: '.pdf,.exe,.msi',
    duplicateAllow: false,
    capture: '',
    minFile: 0,
    maxFile: 0,
    onchange: () => {
      console.log('Hellow World')
    },
    oninput: () => {

    },
  }

  constructor(selector, config) {
    Object.assign(this.#config, config)

    this.#document = config.document ? config.document : document
    this.#window = config.window ? config.window : window

    if (typeof selector === 'string') {
      this.#fileUploadWrap = this.#document.querySelector(selector)
    } else {
      this.#fileUploadWrap = selector
    }
    this.fieldKey = this.#config.fieldKey

    this.#assetsURL = config.assetsURL || ''

    this.init()
  }

  init() {
    this.#fieldLabel = this.#select(`.${this.fieldKey}-label`)
    this.#inpBtn = this.#select(`.${this.fieldKey}-inp-btn`)
    this.#fileSelectStatus = this.#select(`.${this.fieldKey}-file-select-status`)
    this.#maxSizeLabel = this.#select(`.${this.fieldKey}-max-size-lbl`)
    this.#fileUploadInput = this.#select(`.${this.fieldKey}-file-upload-input`)
    this.#filesList = this.#select(`.${this.fieldKey}-files-list`)
    this.#errorWrap = this.#select(`.${this.fieldKey}-err-wrp`)
    const { multiple,
      allowedFileType,
      accept,
      showSelectStatus,
      fileSelectStatus } = this.#config

    this.#fileUploadInput.multiple = multiple
    /* this.#fileUploadInput.onchange = onchange */
    this.#fileUploadInput.accept = allowedFileType ? `${allowedFileType}, ${accept}` : accept
    if (showSelectStatus) this.#fileSelectStatus.innerHTML = fileSelectStatus
    else this.#fileSelectStatus?.remove()
    this.#files = {}
    if (this.#filesList) this.#filesList.innerHTML = ''

    /* if (!this.#config.showFileList) this.#filesList?.remove() */

    this.#addEvent(this.#fileUploadInput, 'change', e => this.#fileUploadAction(e))
  }

  #fileUploadAction(e) {
    const { files } = this.#fileUploadInput

    const { sizeUnit,
      allowMaxSize,
      maxSize,
      maxSizeErrMsg,
      isItTotalMax,
      multiple,
      showFileList,
      fileExistMsg,
      showFilePreview,
      showFileSize,
      showSelectStatus,
      fileSelectStatus,
      minFile,
      minFileErrMsg,
      maxFile,
      maxFileErrMsg } = this.#config

    const maxFileSize = this.#maxFileSize(sizeUnit, maxSize)

    let totalFileSize = 0
    const error = []
    this.#removeClass(this.#errorWrap, 'active')

    if (isItTotalMax) {
      Object.values(this.#files).forEach(file => {
        totalFileSize += file.size
      })
    }
    if (!multiple && files.length > 0) {
      this.#files = {}
      if (this.#filesList) this.#filesList.innerHTML = ''
    }

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i]
      const fileName = file.name.replace(/( |\.|\(|\))/g, '')
      if (!this.#files[fileName]) {
        if (!allowMaxSize || (!maxSize || (file.size + totalFileSize) <= maxFileSize)) {
          if (!(maxFile > 0) || (Object.keys(this.#files).length < maxFile)) {
            this.#files[fileName] = file
            if (showFileList) {
              this.#filesList.innerHTML += `<div id="file-wrp-${fileName}" data-dev-file-wrpr='${this.fieldKey}' class="file-wrpr">
                ${showFilePreview ? `<img src="${this.#getPreviewUrl(file)}" alt="Uploaded Image"  data-dev-file-preview='${this.fieldKey}' class="file-preview" />` : ''}
                  <div class="file-details">
                    <span data-dev-file-title='${this.fieldKey}' class="file-title">${file.name}</span>
                    ${showFileSize ? `<span data-dev-file-size='${this.fieldKey}' class="file-size">${this.#returnFileSize(file.size)}</span>` : ''}
                  </div>
                  <button data-file-id="${fileName}" data-dev-cross-btn='${this.fieldKey}' class="cross-btn">×</button>
              </div>`
            }
            if (isItTotalMax) totalFileSize += file.size
          } else {
            this.#errorWrap.innerHTML = maxFileErrMsg
            this.#addClass(this.#errorWrap, 'active')
            setTimeout(() => {
              this.#removeClass(this.#errorWrap, 'active')
            }, 3000)
          }
        } else {
          error.push(maxSizeErrMsg)
        }
      } else {
        error.push(fileExistMsg)
      }
    }
    /* this.#window.document.querySelectorAll() */
    this.#selectAll(`.${this.fieldKey}-files-list .cross-btn`).forEach(element => {
      this.#addEvent(element, 'click', ev => this.#removeAction(ev))
    })

    const fileLength = Object.keys(this.#files).length

    this.#filesIntializeToInput()

    if (fileLength && showSelectStatus) {
      this.#fileSelectStatus.innerText = `${fileLength} file${fileLength > 1 ? 's' : ''} selected`
    } else if (showSelectStatus) {
      this.#fileSelectStatus.innerHTML = fileSelectStatus
    }

    if (minFile > 0 && fileLength < minFile) {
      this.#errorWrap.innerHTML = minFileErrMsg
      this.#addClass(this.#errorWrap, 'active')
    }
    error.map((err, errId) => {
      this.#filesList.insertAdjacentHTML('afterbegin', `
      <div id='err-${errId}' class="${this.fieldKey}-err-wrp">
          <span>${err}</span>
      </div>`)
      const errorElemnt = this.#select(`#err-${errId}`)
      errorElemnt.classList.add('active')

      setTimeout(() => {
        errorElemnt.classList.remove('active')
      }, 3000)
      setTimeout(() => {
        errorElemnt?.remove()
      }, 5000)
    })
  }

  #filesIntializeToInput() {
    const dataTransfer = new DataTransfer()
    Object.values(this.#files)?.forEach(file => {
      dataTransfer.items.add(file)
    })
    this.#fileUploadInput.files = dataTransfer.files
  }

  #removeAction = e => {
    const id = e.target.getAttribute('data-file-id')
    this.#remove(`#file-wrp-${id}`)

    delete this.#files[id]
    const fileLength = Object.keys(this.#files).length
    if (fileLength) {
      this.#fileSelectStatus.innerText = `${fileLength} file${fileLength > 1 ? 's' : ''} selected`
    } else {
      this.#fileSelectStatus.innerHTML = this.#config.fileSelectStatus
    }
    this.#filesIntializeToInput()
  }

  #select(selector) { return this.#fileUploadWrap.querySelector(selector) }

  #selectAll(selector) { return this.#fileUploadWrap.querySelectorAll(selector) }

  #remove(selector) { this.#select(selector)?.remove() }

  #getPreviewUrl(file) {
    const extention = file.name.substring(file.name.lastIndexOf('.') + 1)
    switch (extention) {
      case 'xbm':
      case 'tif':
      case 'pjp':
      case 'pjpeg':
      case 'svgz':
      case 'jpg':
      case 'jpeg':
      case 'ico':
      case 'tiff':
      case 'gif':
      case 'svg':
      case 'bmp':
      case 'png':
      case 'jfif':
      case 'webp':
        return URL.createObjectURL(file)
      case '7z':
      case 'arj':
      case 'deb':
      case 'pkg':
      case 'rar':
      case '.rpm':
      case '.gz':
      case 'z':
      case 'zip':
        return `${this.#assetsURL}/zip-compressed.svg`
      case 'key':
      case 'odp':
      case 'pps':
      case 'ppt':
      case 'pptx':
        return `${this.#assetsURL}/presentation.svg`
      case '_RF_':
      case 'doc':
      case 'docx':
      case 'odt':
      case 'pdf':
      case 'rtf':
      case 'tex':
      case 'txt':
      case 'wks':
      case 'wps':
      case 'wpd':
        return `${this.#assetsURL}/document.svg`
      case 'csv':
      case 'dat':
      case 'db':
      case 'dbf':
      case 'log':
      case 'mdb':
      case 'sav':
      case 'sql':
      case 'tar':
      case 'sqlite':
      case 'xml':
        return `${this.#assetsURL}/database.svg`
      case 'opus':
      case 'flac':
      case 'webm':
      case 'weba':
      case 'wav':
      case 'ogg':
      case 'm4a':
      case 'mp3':
      case 'oga':
      case 'mid':
      case 'amr':
      case 'aiff':
      case 'wma':
      case 'au':
      case 'acc':
      case 'wpl':
        return `${this.#assetsURL}/file-audio.svg`
      case 'ogm':
      case 'wmv':
      case 'mpg':
      case 'ogv':
      case 'mov':
      case 'asx':
      case 'mpeg':
      case 'mp4':
      case 'm4v':
      case 'avi':
      case '3gp':
      case 'flv':
      case 'mkv':
      case 'swf':
        return `${this.#assetsURL}/file-audio.svg`
      default:
        return `${this.#assetsURL}/paperclip.svg`
    }
  }

  #addEvent(element, eventType, eventAction) {
    element.addEventListener(eventType, eventAction)
    this.#allEventListeners.push({ element, eventType, eventAction })
  }

  #addClass(element, className) {
    element.classList.add(className)
  }

  #removeClass(element, className) {
    element.classList.remove(className)
  }

  #returnFileSize(number) {
    if (number < 1024) {
      return `${number}Bytes`
    } if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)}KB`
    } if (number >= 1048576 && number < 1073741824) {
      return `${(number / 1048576).toFixed(1)}MB`
    } if (number >= 1073741824) {
      return `${(number / 1073741824).toFixed(1)}GB`
    }
  }

  #maxFileSize(sizeUnit, maxSize) {
    switch (sizeUnit) {
      case 'Bytes': return maxSize
      case 'KB': return maxSize * 1024
      case 'MB': return maxSize * 1048576
      case 'GB': return maxSize * 1073741824
      default: return 0
    }
  }

  #detachAllEvents() {
    this.#allEventListeners.forEach(({ element, eventType, eventAction }) => {
      element.removeEventListener(eventType, eventAction)
    })
  }

  destroy() {
    if (this.#filesList) this.#filesList.innerHTML = ''
    this.#detachAllEvents()
  }

  reset() {
    this.destroy()
    this.init()
  }
}
