import {ALERT_NOTIFICATION} from './action-types';
const clearAlertNotif = () => ({type: ALERT_NOTIFICATION });

/**
 * Failure alert definition
 * @param {String} message 
 */
export const alertFailure = (message) => ({
  type: ALERT_NOTIFICATION,
  alert: {
    open: true,
    alertType: "error",
    message
  }
});

/**
 * Successful alert definition
 * @param {String} message 
 */
export const alertSuccess = (message) => ({
  type: ALERT_NOTIFICATION,
  alert: {
    open: true,
    alertType: "success",
    message
  }
})

/**
 * Null out the alert
 */
export const clearAlert = () => {
  return (dispatch) => {
    dispatch(clearAlertNotif());
  };
};