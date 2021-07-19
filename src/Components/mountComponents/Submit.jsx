import React, { useContext } from 'react';
import { Context } from '../Store';
import 'moment/locale/ru';
import fetchFunc from '../helpers/fetchFunction';
import preparingGraphArray from '../helpers/preparingGraphArray';
import { Button, Col } from 'antd';
import buildingStringReportAndChart from '../helpers/buildBodyFetch/getReportAndChart';

export default function Submit() {
  const [globalState, inSetState] = useContext(Context);
  let { toggleActivePage, fetch, ui } = globalState;
  let { chart, report } = globalState.fetch;
  let { ClassID } = globalState.fetch.chart;

  const handleSubmit = async () => {
    if (toggleActivePage === 'chart') {
      inSetState({
        ...globalState,
        fetch: { ...fetch, chart: { ...chart } },
        ui: { ...ui, loadingSpinnerChart: true },
      });
    }
    if (toggleActivePage === 'report') {
      inSetState({
        ...globalState,
        fetch: { ...fetch, report: { ...report, Offset: 0 } },
        ui: { ...ui, loadingSpinnerReport: true },
      });
    }

    const dataFetch = await fetchFunc(
      globalState,
      1,
      'get',
      buildingStringReportAndChart
    );
    if (toggleActivePage === 'report') {
      inSetState({
        ...globalState,
        fetch: {
          ...fetch,
          report: { ...report, Offset: 0, elements: [...dataFetch.arr] },
        },
        ui: {
          ...ui,
          activePage: 1,
          loadingSpinnerReport: false,
          lengthPagination: 0,
          noRenderPagination: dataFetch.noRenderPagination,
        },
      });
    }
    if (toggleActivePage === 'chart') {
      const arrAgregating = preparingGraphArray(dataFetch.arr, ClassID);
      inSetState({
        ...globalState,
        fetch: {
          ...fetch,
          chart: { ...chart, elementsRechart: [...arrAgregating] },
          Offset: 0,
        },
        ui: {
          activePage: 1,
          loadingSpinnerChart: false,
          lengthPagination: 0,
          noRenderPagination: true,
          activeFilterChart: ClassID,
        },
      });
    }
  };

  return (
    <Col
      className="gutter-row"
      xs={{ span: 12, push: 0 }}
      sm={{ span: 8, push: 0 }}
      xl={{ span: 4, push: 0 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
      }}
    >
      <label>&nbsp;</label>
      <Button
        onClick={handleSubmit}
        disabled={(() =>
          toggleActivePage === 'report'
            ? globalState.ui.loadingSpinnerReport
            : globalState.ui.loadingSpinnerChart)()}
        type="primary"
      >
        <span style={{ paddingBottom: 10 }}>Применить</span>
      </Button>
    </Col>
  );
}
