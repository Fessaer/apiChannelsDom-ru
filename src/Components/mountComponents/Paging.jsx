import React, { useContext } from 'react';
import { Context } from '../Store';
import '../Styles/renderTable.css';
import { Pagination } from 'antd';
import fetchFunc from '../helpers/fetchFunction';

export default function Paging() {
  const [globalState, inSetState] = useContext(Context);
  let { lengthPagination, offset, noRenderPagination, fetch } = globalState;
  let { elements } = globalState.fetch.report;
  let { report } = globalState.fetch

  const handlePaging = async(e, f) => {
      report = {...report, loadingSpinnerReport: true }
      fetch = {...fetch, report}
      await inSetState({...globalState, fetch});
      lengthPagination = (e - 1) * 20;
      const newOffSet = (e - 1) * 20;
      offset = newOffSet;
      await inSetState({...globalState, offset, activePage: e, lengthPagination, noRenderPagination: false});
      const dataFetch = await fetchFunc(globalState, e);
      report = {...report, elements: [...dataFetch.arr], loadingSpinnerReport: false }
      fetch = {...fetch, report}
      await inSetState({...globalState, fetch, offset, activePage: e, lengthPagination, noRenderPagination: dataFetch.noRenderPagination});
  }
  
    let { activePage } = globalState; 
    if (elements !== undefined) {
  return (
    <div>
      {elements.length !== 0  || elements.length > 20 || noRenderPagination === false ? 
        <div>
          <Pagination
            current={activePage} 
            onChange={handlePaging}
            defaultPageSize={20}
            showSizeChanger={false}
            defaultCurrent={1} 
            total={elements.length <= 20 ? lengthPagination + 20 : lengthPagination + 30} 
            style={{paddingBlock: "1rem", paddingLeft: "1rem"}}/>
        </div> : null}
    </div>
  )
      } else {
        return null
      }
}
