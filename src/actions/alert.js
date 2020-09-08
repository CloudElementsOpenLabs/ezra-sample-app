import {ALERT_NOTIFICATION} from './action-types';
const clearAlertNotif = () => ({type: ALERT_NOTIFICATION });

export const alertFailure = (message) => ({
  type: ALERT_NOTIFICATION,
  alert: {
    open: true,
    alertType: "error",
    message
  }
});

export const alertSuccess = (message) => ({
  type: ALERT_NOTIFICATION,
  alert: {
    open: true,
    alertType: "success",
    message
  }
})

export const clearAlert = () => {
  return (dispatch) => {
    dispatch(clearAlertNotif());
  };
};