
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
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#0D6EFD");
  const [inState] = useContext(Context);
  const { loadingSpinner } = inState;

  return (
    <div className="sweet-loading">
      <FadeLoader color={color} loading={loadingSpinner} css={override} height={15} width={5} radius={2} margin={2} />
    </div>
  );
}

export default Spinner;