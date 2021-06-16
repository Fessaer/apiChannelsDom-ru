import React, { useContext } from 'react';
import { Context } from '../Store';
import 'moment/locale/ru';
import '../Styles/searchBar.css';
import fetchFunc from '../helpers/fetchFunction';
import preparingGraphArray from '../helpers/preparingGraphArray';

export default function Submit() {
  const [globalState, inSetState] = useContext(Context);
  let { toggleActivePage, fetch  } = globalState;
  let { chart, report } = globalState.fetch
  let { ClassIdChart } =  globalState.fetch.chart
  let { ClassIdReport } =  globalState.fetch.chart

  const handleSubmit = async () => {
    if (toggleActivePage === 'chart') {
      chart = {...chart, loadingSpinnerChart: true }
      fetch = {...fetch, chart}
      inSetState({...globalState, fetch})
    }
    if (toggleActivePage === 'report') {
      report = {...report, loadingSpinnerReport: true }
      fetch = {...fetch, report}
      inSetState({...globalState, fetch})
    }
    
    const dataFetch = await fetchFunc(globalState)
    if (toggleActivePage === 'report') {
      report = {...report, loadingSpinnerReport: false, elements: [...dataFetch.arr] }
      fetch = {...fetch, report}
      inSetState({...globalState, fetch, offset: 0, activePage: 1, loadingSpinnerReport: false, lengthPagination: 0, noRenderPagination: dataFetch.noRenderPagination})
    }
    if (toggleActivePage === 'chart') {
      const arrAgregating = preparingGraphArray(dataFetch.arr, ClassIdChart)
      chart = {...chart, loadingSpinnerChart: false, elementsRechart: [...arrAgregating] }
      fetch = {...fetch, chart}
      
      inSetState({...globalState, offset: 0, activePage: 1, fetch, loadingSpinnerChart: false, lengthPagination: 0, noRenderPagination: true, activeFilterChart: ClassIdChart})
    }
  }

  return (
      <div className="col-lg-2 col-sm-4 pt-1 d-flex align-items-center">
        <button type="button" className="btn btn-outline-primary btn-sm button_max_width" onClick={handleSubmit}>Применить</button>
      </div>
  )
}

