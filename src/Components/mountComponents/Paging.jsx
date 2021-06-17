import React, { useContext } from 'react';
import { Context } from '../Store';
import '../Styles/renderTable.css';
import { Pagination } from 'antd';
import fetchFunc from '../helpers/fetchFunction';

export default function Paging() {
  const [globalState, inSetState] = useContext(Context);
  let { fetch, ui } = globalState;
  let { lengthPagination, noRenderPagination } = globalState.ui;
  let { elements } = globalState.fetch.report;
  let { report, offset } = globalState.fetch

  const handlePaging = async(e, f) => {
    report = await {...report, loadingSpinnerReport: true }
    fetch = await {...fetch, report}
    await inSetState({...globalState, fetch});
    lengthPagination = (e - 1) * 20;
    const newOffSet = (e - 1) * 20;
    offset = newOffSet;
    fetch = await {...fetch, offset}
    ui = await {...ui, activePage: e, lengthPagination, noRenderPagination: false}
    await inSetState({...globalState, fetch, ui});
    const dataFetch = await fetchFunc(globalState, e);
    report = await {...report, elements: [...dataFetch.arr], loadingSpinnerReport: false }
    fetch = await {...fetch, report, offset}
    ui = await {...ui, activePage: e, lengthPagination, noRenderPagination: dataFetch.noRenderPagination}
    await inSetState({...globalState, fetch, ui});
  }
  
    let { activePage } = globalState.ui; 
    if (elements !== undefined) {
  return (
    <>
      {elements.length !== 0  || elements.length > 20 || noRenderPagination === false ? 
        <div className="pl-0">
          <Pagination
            current={activePage} 
            onChange={handlePaging}
            defaultPageSize={20}
            showSizeChanger={false}
            defaultCurrent={1} 
            total={elements.length <= 20 ? lengthPagination + 20 : lengthPagination + 30} 
            style={{paddingBlock: "1rem", paddingLeft: "0rem"}}/>
        </div> : null}
    </>
  )
      } else {
        return null
      }
}
