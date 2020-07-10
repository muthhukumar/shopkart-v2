import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

export default function () {
  return ReactDOM.createPortal(
    <div className="backdrop" />,
    document.getElementById("backdrop")
  );
}
