import React from 'react'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const Loader = () => {
    return (
        <div className="sweet-loading">
          <ClipLoader color={'#896745'} loading={true} css={override} size={300} />
        </div>
      );
}

export default Loader
