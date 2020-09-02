import {
  INSTANCE_CREATING,
  INSTANCE_DELETION_FAILURE,
  INSTANCE_DELETION_SUCCESS,
  INSTANCE_SUCCESS,
  INSTANCE_FAILURE,
} from '../actions/action-types';

const DEFAULT_STATE = {
  loading: false,
  data: {},
  error: null,
  activeElement: null,
};

export default (state = DEFAULT_STATE, payload) => {
  switch (payload.type) {
    case INSTANCE_CREATING:
      return state = {
        ...state,
        loading: true,
        activeElement: payload.activeElement,
        error: null
      };
    case INSTANCE_SUCCESS:
      return state = {
        ...state,
        loading: false,
        data: {
          ...state.data,
          ...payload.data
        },
      };
    case INSTANCE_DELETION_FAILURE:
    case INSTANCE_FAILURE:
      return state = {
        ...state,
        error: payload.error,
        loading: false,
      };
    case INSTANCE_DELETION_SUCCESS:
      return state = {
        ...state,
        // Remove the element instance you deleted
        data: Object.keys(state.data)
          .filter(key => payload.elementKey !== key)
          .reduce((acc, key) => Object.assign({}, {[key]: state.data[key]}, acc), {}),
        activeElement: null,
      };
    default:
      return state;
  }
};