import React, { useContext } from 'react';
import { Context } from '../Store';
import 'moment/locale/ru';
import '../Styles/searchBar.css';
import fetchFunc from '../helpers/fetchFunction';


export default function Submit() {

  const [globalState, inSetState] = useContext(Context);

  const handleTest = async () => {
    inSetState({...globalState, loadingSpinner: true})
    const dataFetch = await fetchFunc(globalState)
    console.log(dataFetch)
    inSetState({...globalState, elements: [...dataFetch.arr], offset: 0, activePage: 1, loadingSpinner: false, lengthPagination: 0, noRenderPagination: dataFetch.noRenderPagination})
  }

  return (
      <div className="col-lg-2 col-sm-4 pt-1 d-flex align-items-center">
      
      <button type="button" className="btn btn-outline-primary btn-sm button_max_width" onClick={handleTest}>Применить</button>
    </div>
  )
}

