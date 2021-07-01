
import React, { useContext } from "react";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
import { Context } from '../Store';
import { color } from '../config/spinner/conf';

// Can be a string as well. Need to ensure each key-value pair ends with ;


const Spinner = (props) => {
  const [globalState] = useContext(Context);
  const { loadingSpinnerChart } = globalState.ui;
  const { loadingSpinnerReport } = globalState.ui;
  const { toggleActivePage } = globalState;
  let { elementsRechart } = globalState.fetch.chart;
 
  if (elementsRechart === undefined) {
    elementsRechart = [];
  }
  
  
  let { left } = props
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: #0D6EFD;
  position: absolute;
  top:30%;
  left: ${left === undefined ? '0' : (left * (() => elementsRechart.length === 0 ? 1 : 2)()).toString()}px;
  right:0;
  bottom:0;
  z-index: 999;
  // margin:auto;
`;

  if (toggleActivePage === "report" && loadingSpinnerReport) {
    return (
      <div>
        <FadeLoader color={color[0]} loading={loadingSpinnerReport} css={override} height={15} width={5} radius={2} margin={2} />
      </div>
    );
  }
  if (toggleActivePage === "chart" && loadingSpinnerChart) {
    return (
      <div>
        <FadeLoader color={color[0]} loading={loadingSpinnerChart} css={override} height={15} width={5} radius={2} margin={2} />
      </div>
    )
  }
  else {
    return null
  }
}

export default Spinner;