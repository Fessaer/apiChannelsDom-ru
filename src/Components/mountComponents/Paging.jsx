/* eslint-disable no-mixed-operators */
import React, { useContext } from 'react';
import { Context } from '../Store';
import '../Styles/renderTable.css';
import { Pagination } from 'antd';
import fetchFunc from '../helpers/fetchFunction';

export default function Paging(props) {
  const [globalState, inSetState] = useContext(Context);
  let { fetch, ui } = globalState;
  let { lengthPagination, noRenderPagination } = globalState.ui;
  let { elements } = globalState.fetch.report;
  let { report, offset } = globalState.fetch
  // console.log(props.norender, 'paging props')

  let propsNorender = props.norender
  if(propsNorender === undefined) propsNorender = 0
  // console.log(propsNorender, 'paging props')

  const handlePaging = async (e, f) => {
    report = await { ...report, loadingSpinnerReport: true }
    fetch = await { ...fetch, report }
    await inSetState({ ...globalState, fetch });
    lengthPagination = (e - 1) * 20;
    const newOffSet = (e - 1) * 20;
    offset = newOffSet;
    fetch = await { ...fetch, offset }
    ui = await { ...ui, activePage: e, lengthPagination, noRenderPagination: false }
    await inSetState({ ...globalState, fetch, ui });
    const dataFetch = await fetchFunc(globalState, e);
    report = await { ...report, elements: [...dataFetch.arr], loadingSpinnerReport: false }
    fetch = await { ...fetch, report, offset }
    ui = await { ...ui, activePage: e, lengthPagination, noRenderPagination: dataFetch.noRenderPagination }
    await inSetState({ ...globalState, fetch, ui });
  }
  // console.log(elements.length)
  let { activePage } = globalState.ui;
  if (elements !== undefined) {
    return (
      <>
        {elements.length !== 0 && propsNorender < elements.length 
        || elements.length > 20 && propsNorender < elements.length 
        || propsNorender < elements.length &&  noRenderPagination === false ?
          <div className="pl-0">
            <Pagination
              current={activePage}
              onChange={handlePaging}
              defaultPageSize={20}
              showSizeChanger={false}
              defaultCurrent={1}
              total={elements.length <= 20 ? lengthPagination + 20 : lengthPagination + 30}
              style={{ paddingBlock: "1rem", paddingLeft: "0rem" }} />
          </div> : null}
      </>
    )
  } else {
    return null
  }
}
