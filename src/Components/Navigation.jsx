import React, { useContext, useEffect } from 'react';
import Chart from './Pages/Chart';
import Report from './Pages/Report';
import { Context } from './Store';
import { Tabs } from 'antd';
import Attestations from './Pages/Attestations';
const { TabPane } = Tabs;

const Navigation = React.memo(() => {
  const [globalState, inSetState] = useContext(Context);
  useEffect(() => {
    inSetState({ ...globalState, toggleActivePage: 'report' });
  }, []);

  const handleChangeActivePage = (key) => {
    inSetState({ ...globalState, toggleActivePage: key });
  };
  return (
    <Tabs
      onChange={handleChangeActivePage}
      type="card"
      style={{ paddingLeft: 16 }}
    >
      <TabPane tab="Журнал" key="report">
        {<Report />}
      </TabPane>
      <TabPane tab="Статистика за период" key="chart">
        {<Chart />}
      </TabPane>
      <TabPane tab="Аттестации" key="attestations">
        {<Attestations />}
      </TabPane>
    </Tabs>
  );
});

export default Navigation;
