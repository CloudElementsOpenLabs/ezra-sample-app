import {
  INSTANCE_DELETION_SUCCESS,
  OBJECT_RETRIEVAL_LOADING,
  OBJECT_RETRIEVAL_SUCCESS,
  OBJECT_RETRIEVAL_FAILURE,
} from '../actions/action-types';

const DEFAULT_STATE = {
  loading: false,
  data: {},
  error: null,
};

export default (state = DEFAULT_STATE, payload) => {
  switch (payload.type) {
    case OBJECT_RETRIEVAL_LOADING:
      return state = {
        ...state,
        loading: true,
        error: null
      };
    case OBJECT_RETRIEVAL_SUCCESS:
      return state = {
        ...state,
        loading: false,
        data: {
          ...state.data,
          ...payload.data
        },
      };
    case OBJECT_RETRIEVAL_FAILURE:
      return state = {
        ...state,
        error: payload.error,
        loading: false,
      };
    case INSTANCE_DELETION_SUCCESS:
      return state = {
        ...state,
        // Remove the objects for the element instance you deleted
        data: Object.keys(state.data)
          .filter(key => payload.elementKey !== key)
          .reduce((acc, key) => Object.assign({}, {[key]: state.data[key]}, acc), {}),
      };
    default:
      return state;
  }
};