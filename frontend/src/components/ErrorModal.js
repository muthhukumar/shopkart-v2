import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import { closeNotifyAction } from "../redux/ErrorHandlerStore/actionCreators";
import "./ErrorModal.css";

export default function () {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return [state.action.notificationMessage, state.action.isNotificationOpen];
  });

  const [message, isOpen] = data;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen) dispatch(closeNotifyAction());
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen, dispatch]);

  return ReactDOM.createPortal(
    <div className="error-modal">{message}</div>,
    document.getElementById("errorModal")
  );
}
