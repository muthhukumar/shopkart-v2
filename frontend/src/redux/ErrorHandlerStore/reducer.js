import {
  CLOSE_NOTIFICATION,
  LOADING,
  STOP_LOADING,
  NOTIFICATION_MESSAGE,
  OPEN_BACKDROP,
  CLOSE_BACKDROP,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  notificationMessage: "",
  isNotificationOpen: false,
  isBackdropOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true, isBackdropOpen: true };
    case STOP_LOADING:
      return { ...state, isLoading: false, isBackdropOpen: false };
    case NOTIFICATION_MESSAGE:
      return {
        ...state,
        notificationMessage: action.payload,
        isNotificationOpen: true,
      };
    case CLOSE_NOTIFICATION:
      return { ...state, notificationMessage: "", isNotificationOpen: false };
    case OPEN_BACKDROP:
      return { ...state, isBackdropOpen: true };
    case CLOSE_BACKDROP:
      return { ...state, isBackdropOpen: false };

    default:
      return state;
  }
}
