/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useTable, useFilters, usePagination, useGlobalFilter, useSortBy, useRowSelect, useResizeColumns, useBlockLayout, useFlexLayout } from 'react-table'
import TableCheckBox from './ElmSettings/Childs/TableCheckBox'
import Menu from './ElmSettings/Childs/Menu'
import EyeToggle from './ElmSettings/Childs/EyeToggle'
import Modal from './Modal'
import { Scrollbars } from 'react-custom-scrollbars'

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef
    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])
    return (
      <>
        <TableCheckBox refer={resolvedRef} rest={rest} />
      </>
    )
  },
)

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div className="f-search">
      <button type="button" className="icn-btn" aria-label="icon-btn"><span className="btcd-icn icn-search" /></button>
      <input
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined)
        }}
        placeholder="Search"
      />
    </div>
  )
}

export default function Table(props) {
  const [showStMdl, setShowStMdl] = React.useState(false)
  const [showDelMdl, setShowDelMdl] = React.useState(false)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    selectedFlatRows, // row select
    flatColumns, // col hide
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      ...props,
      manualPagination: typeof props.pageCount !== 'undefined',
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    // useBlockLayout,
    useFlexLayout,
    props.resizable ? useResizeColumns : '', // resize
    props.rowSeletable ? useRowSelect : '', // row select
    props.rowSeletable ? (hooks => {
      hooks.flatColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }) : '',
  );

  const handleGotoPageZero = () => {
    if (props.getPageIndex) {
      props.getPageIndex(0)
    }
    gotoPage(0)
  }
  const handleGotoLastPage = () => {
    if (props.getPageIndex) {
      props.getPageIndex(pageCount - 1)
    }
    gotoPage(pageCount - 1)
  }
  const handleNextPage = () => {
    if (props.getPageIndex) {
      props.getPageIndex(pageIndex + 1)
    }
    nextPage()
  }
  const handlePreviousPage = () => {
    if (props.getPageIndex) {
      props.getPageIndex(pageIndex - 1)
    }
    previousPage()
  }

  return (
    <>
      <Modal
        sm
        title="Change Status"
        subTitle="Change status of all selected form"
        show={showStMdl}
        setModal={setShowStMdl}
      >
        <button onClick={e => { props.setBulkStatus(e, selectedFlatRows); setShowStMdl(false) }} className="btn blue btn-lg blue-sh " type="button">Enable</button>
        <button onClick={e => { props.setBulkStatus(e, selectedFlatRows); setShowStMdl(false) }} className="btn red btn-lg red-sh ml-4" type="button">Disable</button>
      </Modal>

      <Modal
        sm
        title="Delete ?"
        subTitle="Delete all selected form"
        show={showDelMdl}
        setModal={setShowDelMdl}
      >
        <button onClick={e => { props.setBulkDelete(e, selectedFlatRows); setShowDelMdl(false) }} className="btn red btn-lg red-sh ml-4" type="button">Yes</button>
        <button onClick={() => { setShowDelMdl(false) }} className="btn blue btn-lg blue-sh ml-4" type="button">No</button>
      </Modal>

      <div className="btcd-t-actions">
        <div className="flx">
          {props.columnHidable
            && (
              <Menu icn="icn-remove_red_eye">
                {flatColumns.map(column => {
                  if (column.Header !== 'Status'
                    && column.Header !== 'Actions'
                    && column.Header !== '#'
                    && typeof column.Header !== 'function') {
                    return (
                      <div key={column.id}>
                        <EyeToggle id={column.id} title={column.Header} props={column.getToggleHiddenProps()} />
                      </div>
                    )
                  }
                  return null
                })}
              </Menu>
            )}
          {selectedFlatRows.length > 0
            && (
              <>
                {'setBulkStatus' in props
                  && (
                    <button onClick={() => setShowStMdl(true)} className="icn-btn btcd-icn-lg tooltip" style={{ '--tooltip-txt': '"Status"' }} aria-label="icon-btn" type="button">
                      <span className="btcd-icn icn-toggle_off" />
                    </button>
                  )}
                <button onClick={() => setShowDelMdl(true)} className="icn-btn btcd-icn-lg tooltip" style={{ '--tooltip-txt': '"Delete"' }} aria-label="icon-btn" type="button">
                  <span className="btcd-icn icn-trash-fill" style={{ fontSize: 16 }} />
                </button>
                <small>
                  {selectedFlatRows.length} Row Selected
                </small>
              </>
            )}
        </div>
      </div>

      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <div className="btcd-f-t-wrp">
        <Scrollbars className="btcd-all-f-scrl" style={{ height: props.height }}>
          <table {...getTableProps()} className="f-table">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      {' '}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? String.fromCharCode(9662)
                            : String.fromCharCode(9652)
                          : <span className="btcd-icn icn-sort" style={{ fontSize: 10, marginLeft: 5 }} />}
                      </span>
                      {props.resizable
                        && (
                          <div
                            {...column.getResizerProps()}
                            className={`btcd-t-resizer ${column.isResizing ? 'isResizing' : ''}`}
                          />
                        )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className={`tr ${row.isSelected ? 'btcd-row-selected' : ''}`}>
                    {row.cells.map(cell => (
                      <td className="td" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Scrollbars>
      </div>

      <div className="btcd-pagination">
        <button className="icn-btn" type="button" onClick={handleGotoPageZero} disabled={!canPreviousPage}>
          &laquo;
        </button>
        {' '}
        <button className="icn-btn" type="button" onClick={handlePreviousPage} disabled={!canPreviousPage}>
          &lsaquo;
        </button>
        {' '}
        <button className="icn-btn" type="button" onClick={handleNextPage} disabled={!canNextPage}>
          &rsaquo;
        </button>
        {' '}
        <button className="icn-btn" type="button" onClick={handleGotoLastPage} disabled={!canNextPage}>
          &raquo;
        </button>
        {' '}
        <small>
          &nbsp;Page
          {' '}
          <strong>
            {pageIndex + 1}
            {' '}
            of
            {' '}
            {pageOptions.length}
            {' '}
            &nbsp;
          </strong>
          {' '}
        </small>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
            if (props.getPageSize) {
              props.getPageSize(e.target.value, pageIndex)
            }
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSiz => (
            <option key={pageSiz} value={pageSiz}>
              Show
              {' '}
              {pageSiz}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
