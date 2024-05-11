import React from "react";
import { LOGO_IC } from "../../Assets";

const LOADER = () => {
  return (
    <div id="loader-wrapper">
      <img src={LOGO_IC} alt="logo" className="w-20" />
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LOADER;
