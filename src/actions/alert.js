import {ALERT_NOTIFICATION} from './action-types';
const clearAlertNotif = () => ({type: ALERT_NOTIFICATION });

export const clearAlert = () => {
  return (dispatch) => {
    dispatch(clearAlertNotif());
  };
};