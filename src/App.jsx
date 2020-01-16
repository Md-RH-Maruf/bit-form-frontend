/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react'
import { Router, Link } from '@reach/router'
import './resource/sass/app.scss'
import './resource/sass/components.scss'
// import './resource/icons/style.css'
import './resource/js/custom'
import Builder from './pages/Builder'
import AllForms from './pages/AllForms'

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
  </div>
)

export default class App extends React.Component {
  col

  constructor(props) {
    super(props)
    this.state = {
      newCounter: 0,
      forceRender: false,
      drgElm: ['', { h: 1, w: 1, i: '' }],
      gridWidth: 840,
      settings: { id: null, type: null, data: null },
      layout: [
        /* { i: 'blk_1', x: 0, y: 0, w: 1, h: 2 },
        { i: 'blk_2', x: 1, y: 0, w: 1, h: 2 },
        { i: 'blk_3', x: 2, y: 0, w: 1, h: 2 },
        { i: 'blk_4', x: 3, y: 0, w: 1, h: 2 },
        { i: 'blk_5', x: 4, y: 0, w: 1, h: 2 },
        { i: 'blk_6', x: 5, y: 0, w: 1, h: 2 },
        { i: 'blk_7', x: 6, y: 0, w: 1, h: 2 },
        { i: 'blk_8', x: 7, y: 0, w: 1, h: 2 },
        { i: 'blk_9', x: 8, y: 0, w: 1, h: 2 },
        { i: 'blk_10', x: 9, y: 0, w: 1, h: 2 }, */
      ],
      data: {
        blk_1: [
          {
            tag: 'label',
            attr: {},
            child: 'laebl',
          },
          {
            tag: 'div',
            attr: { type: 'text' },
            child: [
              { tag: 'label', attr: '', child: 'laebl' },
              { tag: 'label', attr: '', child: 'laebl' },
            ],
          },
        ],
        blk_2: [
          { tag: 'label', attr: '', child: 'laebl' },
          {
            tag: 'div',
            attr: { type: 'text' },
            child: { tag: 'b', attr: {}, child: 'bold' },
          },
        ],
        blk_3: [
          {
            tag: 'label',
            attr: {},
            child: 'laebl',
          },
          {
            tag: 'input',
            attr: { type: 'text' },
            child: null,
          },
        ],
        blk_4: [],
        blk_5: [],
        blk_6: [],
        blk_7: [],
        blk_8: [],
        blk_9: [],
        blk_10: [],
      },
    }
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.setDrgElm = this.setDrgElm.bind(this)
    this.setGridWidth = this.setGridWidth.bind(this)
    this.getElmSettings = this.getElmSettings.bind(this)
    this.addData = this.addData.bind(this)
    this.updateData = this.updateData.bind(this)
    this.onAddItem = this.onAddItem.bind(this)
    this.stringifyLayout = this.stringifyLayout.bind(this)
    this.setNavActive = this.setNavActive.bind(this)

    /* function insertion_Sort(arr) {
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[0]) {
          //move current element to the first position
          [arr[i], arr[0]] = [arr[0], arr[i]]
          arr.unshift(arr.splice(i, 1)[0]);
        }
        else if (arr[i] > arr[i - 1]) {
          //leave current element where it is
          continue;
        }
        else {
          //find where element should go
          for (let j = 1; j < i; j++) {
            if (arr[i] > arr[j - 1] && arr[i] < arr[j]) {
              //move element
              arr.splice(j, 0, arr.splice(i, 1)[0]);
            }
          }
        }
      }
      return arr;
    }

    console.log(insertion_Sort([3, 0, 2, 5, -1, 4, 1])); */
  }

  onLayoutChange(layout) {
    // console.log(this.col, cols);
    /* let count = 0
    if (this.col != cols) {
      console.log('cols', this.col, cols, layout);
      let w = 0
      for (let i = 0; i < layout.length; i += 2) {
        console.log(i)
        w = 0
        for (let j = 0; j < cols; j++) {
          count++
          if (count < layout.length) {
            layout[count].x = w
            layout[count].y = i
            console.log("x", w, "y", i)
            w += 1
          } else {
            break;
            console.log('exrta', count)
          }
        }
      }
      console.log(layout)
      this.col = cols
    } */
    // console.log(cols, layout);
    this.setState({ layout })
  }

  onAddItem(elm) {
    const { w, h, minH, maxH, minW } = elm[1]
    const x = 0
    const y = Infinity
    this.setState(prvState => ({
      ...prvState,
      data: {
        ...prvState.data, [`n_blk_${prvState.newCounter}`]: elm[0],
      },
      layout: prvState.layout.concat({ i: `n_blk_${prvState.newCounter}`, x, y, w, h, minH, maxH, minW }),
      newCounter: prvState.newCounter + 1,
      forceRender: !prvState.forceRender,
    }))
  }

  getElmSettings(id, type) {
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ settings: { id, type, data: this.state.data[id][0] } })
  }

  setDrgElm(el) {
    this.setState({ drgElm: el })
  }

  setGridWidth(w) {
    this.setState({ gridWidth: w - 20 })
  }

  addData(counter, newLayBlk) {
    this.setState(prvState => ({
      ...prvState,
      data: {
        ...prvState.data, [`n_blk_${counter}`]: prvState.drgElm[0],
      },
      layout: prvState.layout.concat(newLayBlk),
      newCounter: counter + 1,
    }))
  }

  updateData(updatedElm) {
    this.setState(prvState => {
      const { data } = prvState
      data[updatedElm.id] = [updatedElm.data]
      return {
        ...prvState,
        data,
        forceRender: !prvState.forceRender,
      }
    })
  }

  stringifyLayout() {
    return this.state.layout.map((l) => (
      <div className="layoutItem" key={l.i}>
        <b>{l.i}</b>:[{l.x}, {l.y}, {l.w}, {l.h}]
      </div>
    ))
  }

  // eslint-disable-next-line class-methods-use-this
  setNavActive(isCurrent, index) {

    const as = {
      style: {
        color: '#0e112f',
        fontWeight: 'bold',
        background: 'white',
      },
    }
    const is = {
      style: {
        fontWeight: 'normal',
      },
    }

    return isCurrent ? as : is
  }

  render() {
    const builderProps = {
      gridWidth: this.state.gridWidth,
      newCounter: this.state.newCounter,
      draggedElm: this.state.drgElm,
      forceRender: this.state.forceRender,
      settings: this.state.settings,
      data: this.state.data,
      layout: this.state.layout,
      setDrgElm: this.setDrgElm,
      onAddItem: this.onAddItem,
      setGridWidth: this.setGridWidth,
      stringifyLayout: this.stringifyLayout,
      setLayout: this.setLayout,
      onLayoutChange: this.onLayoutChange,
      addData: this.addData,
      getElmSettings: this.getElmSettings,
      updateData: this.updateData,
    }

    return (
      <div className="Btcd-App">
        <div className="nav-wrp">
          <div className="logo" />
          <nav className="top-nav">

            <Link
              to="/"
              getProps={({ isCurrent }) => this.setNavActive(isCurrent, 0)}
            >My Forms
            </Link>

            <Link
              to="/builder"
              getProps={({ isCurrent }) => this.setNavActive(isCurrent, 1)}
            >Builder
            </Link>

            <Link
              to="settings"
              getProps={({ isCurrent }) => this.setNavActive(isCurrent, 2)}
            >Settings
            </Link>

          </nav>
        </div>
        <div className="route-wrp">
          <Router primary={false}>
            <AllForms path="/">All Forms</AllForms>

            <Builder
              path="/builder/:preLayout"
              {...builderProps}
            />
            <Dashboard path="settings">Settings</Dashboard>
          </Router>
        </div>
      </div>
    )
  }
}

// const gridProps = window.gridProps || {};
