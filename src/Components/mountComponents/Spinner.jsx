
import { useState, useContext } from "react";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
import { Context } from '../Store';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #0D6EFD;
  position: absolute;
  top:30%;
  left:0;
  right:0;
  bottom:0;
  z-index: 999;
  // margin:auto;
`;

const Spinner = () => {
  let [color] = useState("#0D6EFD");
  const [globalState] = useContext(Context);
  const { loadingSpinnerChart } = globalState.ui;
  const { loadingSpinnerReport } = globalState.ui;
  const { toggleActivePage } = globalState;
  if (toggleActivePage === "report") {
    return (
      <div className="sweet-loading">
        <FadeLoader color={color} loading={loadingSpinnerReport} css={override} height={15} width={5} radius={2} margin={2} />
      </div>
    );
  }
  if (toggleActivePage === "chart") {
    return (
      <div className="sweet-loading">
        <FadeLoader color={color} loading={loadingSpinnerChart} css={override} height={15} width={5} radius={2} margin={2} />
      </div>
    )
  }
  else {
    return null
  }
}

export default Spinner;