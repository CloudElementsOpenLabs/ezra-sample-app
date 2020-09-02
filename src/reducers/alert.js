import {
  ALERT_NOTIFICATION,
} from '../actions/action-types';

const DEFAULT_STATE = null;

export default (state = DEFAULT_STATE, payload) => {
  switch (payload.type) {
    case ALERT_NOTIFICATION:
      return state = {
        ...payload.alert,
      };
    default:
      return state;
  }
};