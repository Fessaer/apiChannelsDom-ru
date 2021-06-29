import React, { useContext } from 'react';
import { Context } from '../Store';
import 'moment/locale/ru';
import '../Styles/searchBar.css';
import fetchFunc from '../helpers/fetchFunction';
import preparingGraphArray from '../helpers/preparingGraphArray';

export default function SubmitSpinner() {
  const [globalState, inSetState] = useContext(Context);
  const { loadingSpinnerChart } = globalState.ui;
  const { loadingSpinnerReport } = globalState.ui;
  let { toggleActivePage, fetch, ui } = globalState;
  let { chart, report } = globalState.fetch
  let { ClassID } = globalState.fetch.chart

  const handleSubmit = async () => {
    if (toggleActivePage === 'chart') {
      chart = { ...chart }
      ui = {...ui, loadingSpinnerChart: true}
      fetch = { ...fetch, chart }
      inSetState({ ...globalState, fetch, ui })
    }
    if (toggleActivePage === 'report') {
      report = { ...report }
      ui = {...ui, loadingSpinnerChart: true}
      fetch = { ...fetch, report }
      inSetState({ ...globalState, fetch, ui })
    }

    const dataFetch = await fetchFunc(globalState)
    if (toggleActivePage === 'report') {
      report = { ...report, elements: [...dataFetch.arr] }
      ui = { ...ui, activePage: 1, loadingSpinnerReport: false, lengthPagination: 0, noRenderPagination: dataFetch.noRenderPagination }
      fetch = { ...fetch, report, offset: 0 }
      inSetState({ ...globalState, fetch, ui })
    }
    if (toggleActivePage === 'chart') {
      const arrAgregating = preparingGraphArray(dataFetch.arr, ClassID)
      chart = { ...chart, elementsRechart: [...arrAgregating] }
      ui = { ...ui, activePage: 1, loadingSpinnerChart: false, lengthPagination: 0, noRenderPagination: true, activeFilterChart: ClassID }
      fetch = { ...fetch, chart, offset: 0 }
      inSetState({ ...globalState, fetch, ui })
    }
  }
  if (toggleActivePage === "report") {
  return (
    <div className="d-flex align-items-end col-sm-4 col-lg-3 col-xl-2 pt-1 pb-3 button_max_width">
      <button className="btn-outline-primary btn-sm button_max_width" type="button" disabled={loadingSpinnerReport} style={{height: "32px"}} onClick={handleSubmit}>
      {loadingSpinnerReport === true ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : null}
        <span className="sr-only ps-1">Применить</span>
      </button>
    </div>
    )
  }
  if (toggleActivePage === "chart") {
    return (
      <div className="d-flex align-items-end col-sm-4 col-lg-3 col-xl-2 pt-1 pb-3 button_max_width">
        <button className="btn-outline-primary btn-sm button_max_width" type="button" disabled={loadingSpinnerChart} style={{height: "32px"}} onClick={handleSubmit}>
        {loadingSpinnerChart === true ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : null}
          <span className="sr-only ps-1">Применить</span>
        </button>
      </div>
      )
    }
    else {
      return null;
    }
}

