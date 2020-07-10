import {
  CLOSE_NOTIFICATION,
  LOADING,
  STOP_LOADING,
  NOTIFICATION_MESSAGE,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  notificationMessage: "",
  isNotificationOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    case NOTIFICATION_MESSAGE:
      return {
        ...state,
        notificationMessage: action.payload,
        isNotificationOpen: true,
      };
    case CLOSE_NOTIFICATION:
      return { ...state, notificationMessage: "", isNotificationOpen: false };

    default:
      return state;
  }
}
