import React, { useContext } from 'react';
import { Context } from '../Store';
import 'moment/locale/ru';
// import '../Styles/searchBar.css';
import fetchFunc from '../helpers/fetchFunction';
import preparingGraphArray from '../helpers/preparingGraphArray';
import { Button, Col } from 'antd';


export default function Submit() {
  const [globalState, inSetState] = useContext(Context);
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
      report = { ...report, Offset: 0 }
      ui = {...ui, loadingSpinnerReport: true}
      fetch = { ...fetch, report }
      inSetState({ ...globalState, fetch, ui })
    }

    const dataFetch = await fetchFunc(globalState)
    if (toggleActivePage === 'report') {
      report = { ...report, Offset: 0, elements: [...dataFetch.arr] }
      ui = { ...ui, activePage: 1, loadingSpinnerReport: false, lengthPagination: 0, noRenderPagination: dataFetch.noRenderPagination }
      fetch = { ...fetch, report }
      inSetState({ ...globalState, fetch, ui })
    }
    if (toggleActivePage === 'chart') {
      const arrAgregating = preparingGraphArray(dataFetch.arr, ClassID)
      chart = { ...chart, elementsRechart: [...arrAgregating] }
      ui = { activePage: 1, loadingSpinnerChart: false, lengthPagination: 0, noRenderPagination: true, activeFilterChart: ClassID }
      fetch = { ...fetch, chart, Offset: 0 }
      inSetState({ ...globalState, fetch, ui })
    }
  }

  return (
    <Col className="gutter-row" xs={{ span: 12, push: 0}} sm={{ span: 8, push: 0}} xl={{ span: 4, push: 0}} style={{display:'flex', alignItems: 'flex-end', height: 54 }}>
      <Button onClick={handleSubmit} disabled={globalState.ui.loadingSpinnerReport} type="primary">
        <span style={{paddingBottom: '10px'}}>Применить</span>
      </Button>
    </Col>
      // <button type="button" disabled={globalState.ui.loadingSpinnerReport} className="btn btn-outline-primary btn-sm button_max_width" style={{height: "32px"}} onClick={handleSubmit}>Применить</button>
    
  )
}

