import React, { useContext } from 'react';
import { Context } from '../Store';
import 'moment/locale/ru';
import '../Styles/searchBar.css';
import fetchFunc from '../helpers/fetchFunction';


export default function Submit() {

  const [globalState, inSetState] = useContext(Context);

  const handleTest = async () => {
    await inSetState({...globalState, loadingSpinner: true})
    const dataFetch = await fetchFunc(globalState)
    console.log('test')
    await console.log(dataFetch, 'dataFetch')
    await inSetState({...globalState, elements: [...dataFetch], offset: 0, activePage: 1, loadingSpinner: false, lengthPagination: 0})
  }

  return (
    <div className="col-lg-2 col-sm-4 d-flex align-items-center">
      <button type="button" className="btn btn-outline-primary btn-sm button_max_width" onClick={handleTest}>Применить</button>
    </div>
  )
}

