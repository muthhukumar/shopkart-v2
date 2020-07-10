import {
  CLOSE_NOTIFICATION,
  LOADING,
  STOP_LOADING,
  NOTIFICATION_MESSAGE,
} from "./actionTypes";

export function loadingAction() {
  return {
    type: LOADING,
  };
}

export function stopLoadingAction() {
  return {
    type: STOP_LOADING,
  };
}

export function NotifyAction(message) {
  return {
    type: NOTIFICATION_MESSAGE,
    payload: message,
  };
}

export function closeNotifyAction() {
  return {
    type: CLOSE_NOTIFICATION,
  };
}
