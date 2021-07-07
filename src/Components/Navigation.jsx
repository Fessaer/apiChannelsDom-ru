import React, { useContext, useEffect } from 'react'
import Chart from './Pages/Chart';
import Report from './Pages/Report';
import { Context } from './Store';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const Navigation = React.memo(props => {
  const [globalState, inSetState] = useContext(Context);
  useEffect(() => {
    inSetState({...globalState, toggleActivePage: 'report'})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeActivePage = (key) => {
    inSetState({...globalState, toggleActivePage: key})
  };
  return (
      <Tabs onChange={handleChangeActivePage} type="card" style={{marginLeft: 16}}>
        <TabPane tab="Журнал" key="report">
          {<Report />}
        </TabPane>
        <TabPane tab="Статистика за период" key="chart">
          {<Chart />}
        </TabPane>
      </Tabs>
    )
});

export default Navigation;
