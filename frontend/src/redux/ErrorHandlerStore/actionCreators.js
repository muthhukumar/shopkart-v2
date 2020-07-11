import {
  CLOSE_NOTIFICATION,
  LOADING,
  STOP_LOADING,
  NOTIFICATION_MESSAGE,
  OPEN_BACKDROP,
  CLOSE_BACKDROP,
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

export function openBackdropAction() {
  return {
    type: OPEN_BACKDROP,
  };
}

export function closeBackdropAction() {
  return {
    type: CLOSE_BACKDROP,
  };
}

