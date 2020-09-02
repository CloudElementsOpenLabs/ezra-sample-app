import {
  APPLICATION_RETRIEVAL_LOADING,
  APPLICATION_RETRIEVAL_SUCCESS,
  APPLICATION_RETRIEVAL_FAILURE,
} from '../actions/action-types';

const DEFAULT_STATE = {
  loading: false,
  data: {},
  error: null,
};

export default (state = DEFAULT_STATE, payload) => {
  switch (payload.type) {
    case APPLICATION_RETRIEVAL_LOADING:
      return state = {
        ...state,
        loading: true,
        error: null
      };
    case APPLICATION_RETRIEVAL_SUCCESS:
      return state = {
        ...state,
        loading: false,
        data: payload.data,
      };
    case APPLICATION_RETRIEVAL_FAILURE:
      return state = {
        ...state,
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};