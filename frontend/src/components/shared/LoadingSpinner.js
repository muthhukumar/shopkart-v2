import React from "react";
import ReactDOM from "react-dom";

import "./LoadingSpinner.css";

export default function () {
  return ReactDOM.createPortal(
    <div className="loading-spinner_container">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>,
    document.getElementById("loading-spinner")
  );
}
