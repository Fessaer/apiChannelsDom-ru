import React, { useContext } from 'react';
import { Context } from '../Store';
import 'moment/locale/ru';
import fetchFunc from '../helpers/fetchFunction';
import preparingGraphArray from '../helpers/preparingGraphArray';
import { Button, Col } from 'antd';

export default function SubmitSpinner() {
  const [globalState, inSetState] = useContext(Context);
  const { loadingSpinnerChart } = globalState.ui;
  const { loadingSpinnerReport } = globalState.ui;
  let { toggleActivePage, fetch, ui } = globalState;
  let { chart, report } = globalState.fetch
  let { ClassID } = globalState.fetch.chart

  const handleSubmit = async () => {
    if (toggleActivePage === 'chart') {
      ui = {...ui, loadingSpinnerChart: true}
      fetch = { ...fetch, chart }
      inSetState({ ...globalState, fetch, ui })
    }
    if (toggleActivePage === 'report') {
      ui = {...ui, loadingSpinnerChart: true}
      fetch = { ...fetch, report }
      inSetState({ ...globalState, fetch, ui })
    }

    const dataFetch = await fetchFunc(globalState, 1)
    if (toggleActivePage === 'report') {
      report = { ...report, Offset: 0, elements: [...dataFetch.arr] }
      ui = { ...ui, activePage: 1, loadingSpinnerReport: false, lengthPagination: 0, noRenderPagination: dataFetch.noRenderPagination }
      fetch = { ...fetch, report  }
      inSetState({ ...globalState, fetch, ui })
    }
    if (toggleActivePage === 'chart') {
      const arrAgregating = preparingGraphArray(dataFetch.arr, ClassID)
      chart = { ...chart, Offset: 0, elementsRechart: [...arrAgregating] }
      ui = { ...ui, activePage: 1, loadingSpinnerChart: false, lengthPagination: 0, noRenderPagination: true, activeFilterChart: ClassID }
      fetch = { ...fetch, chart  }
      inSetState({ ...globalState, fetch, ui })
    }
  }
  if (toggleActivePage === "report") {
  return (
    <div className="d-flex align-items-end col-sm-4 col-lg-3 col-xl-2 pt-1 pb-3 button_max_width">
      <button className="btn btn-outline-primary btn-sm button_max_width" type="button"  style={{height: "32px"}} onClick={handleSubmit}>
      {loadingSpinnerReport === true ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : null}
        <span className="sr-only ps-1">Применить</span>
      </button>
    </div>
    )
  }
  if (toggleActivePage === "chart") {
    return (
        <Col className="gutter-row" xs={{ span: 24, push: 0}} sm={{ span: 6, push: 0}} xl={{ span: 4, push: 0}} style={{display:'flex', alignItems: 'flex-end', height: 54 }}>
          <Button type="primary" loading={loadingSpinnerChart} onClick={handleSubmit}>
            Применить
          </Button>
        </Col>
      )
    }
    else {
      return null;
    }
}

