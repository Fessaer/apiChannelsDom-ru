import React, { useContext, useEffect } from 'react';
import { Context } from '../Store';
import '../Styles/renderTable.css';
import { Pagination } from 'antd';
import fetchFunc from '../helpers/fetchFunction';

export default function Paging(props) {
  const [globalState, inSetState] = useContext(Context);
  let { elements, lengthPagination, offset, noRenderPagination } = globalState;
  // useEffect(() => {
  //   inSetState({...globalState, toggleActivePage: 'paging'})
  //   console.log('useEffect')
  // }, [])

  const handlePaging = async(e, f) => {
      inSetState({...globalState, loadingSpinner: true});
      console.log(e, 'e => activePage');
      lengthPagination = (e - 1) * 20;
      const newOffSet = (e - 1) * 20;
      offset = newOffSet;
      inSetState({...globalState, offset, activePage: e, lengthPagination, noRenderPagination: false});
      const dataFetch = await fetchFunc(globalState, e);
      inSetState({...globalState, elements:[...dataFetch.arr], offset, activePage: e, lengthPagination, noRenderPagination: dataFetch.noRenderPagination, loadingSpinner: false});
      console.log(globalState, 'globalState');
  }
  
    let { activePage } = globalState; 
    console.log(elements.length, 'elements.length')
  return (
    <div>
      {elements.length !== 0 || elements.length > 20 || noRenderPagination === false ? 
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
}
