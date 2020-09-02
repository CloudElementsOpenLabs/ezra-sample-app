import {ALERT_NOTIFICATION, APPLICATION_RETRIEVAL_LOADING, APPLICATION_RETRIEVAL_SUCCESS, APPLICATION_RETRIEVAL_FAILURE} from './action-types';
import {handleResponse} from '../ce-util';

const applicationRetrievalLoading = () => ({type: APPLICATION_RETRIEVAL_LOADING});
const applicationRetrievalSuccess = data => ({type: APPLICATION_RETRIEVAL_SUCCESS, data});
const applicationRetrievalFailure = error => ({type: APPLICATION_RETRIEVAL_FAILURE, error});
const alertFailure = (message) => ({type: ALERT_NOTIFICATION, alert: {open: true, alertType: "error", message}});

const getApplicationById = (ceKeys, applicationId) => {
  return () => {
    const ezraBaseUrl = process.env.REACT_APP_EZRA_APP_URI;
    const config = {
      method: 'GET',
      headers: {
          'Authorization': `User ${ceKeys.userToken}, Organization ${ceKeys.orgToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
    };
    return fetch(`${ezraBaseUrl}/${applicationId}`, config);
  };
};

export const retrieveApplication = (ceKeys, successCallback) => {
  const applicationId = process.env.REACT_APP_EZRA_APP_ID;
  return (dispatch) => {
    dispatch(applicationRetrievalLoading());
    return dispatch(getApplicationById(ceKeys, applicationId))
      .then(handleResponse)
      .then(r => r.json())
      .then(r => {
        console.log('Retrieve application success', r);
        dispatch(applicationRetrievalSuccess(r));
        if (successCallback) {
          successCallback(r);
        }
    })
      .catch(e => {
        console.error('Retrieve application failed', e);
        dispatch(applicationRetrievalFailure(e));
        dispatch(alertFailure(`Could not retrieve application for ${applicationId}`));
    });
  };
};