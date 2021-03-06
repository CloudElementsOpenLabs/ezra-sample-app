import {OBJECT_RETRIEVAL_LOADING, OBJECT_RETRIEVAL_SUCCESS, OBJECT_RETRIEVAL_FAILURE} from './action-types';
import {alertFailure} from './alert';
import {handleResponse} from '../utils/ce-util';

const objectRetrievalLoading = () => ({type: OBJECT_RETRIEVAL_LOADING});
const objectRetrievalSuccess = data => ({type: OBJECT_RETRIEVAL_SUCCESS, data});
const objectRetrievalFailure = error => ({type: OBJECT_RETRIEVAL_FAILURE, error});

/**
 * API call for retrieving available objects from an element instance integration
 * @param {Object} ceKeys 
 * @param {Object} instance 
 */
const getObjects = (ceKeys, instance) => {
  return () => {
    const baseUrl = `https://${process.env.REACT_APP_CE_ENV}.cloud-elements.com`;
    const config = {
      method: 'GET',
      headers: {
          'Authorization': `User ${ceKeys.userToken}, Organization ${ceKeys.orgToken}, Element ${instance.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
    };
    return fetch(`${baseUrl}/elements/api-v2/objects`, config);
  };
};

/**
 * Retrieve the available objects from an element instance integration
 * @param {Object} ceKeys 
 * @param {Object} instance 
 * @param {Function} successCallback 
 */
export const retrieveObjects = (ceKeys, instance, successCallback) => {
  const elementKey = instance.element.key;
  return (dispatch) => {
    dispatch(objectRetrievalLoading());
    return dispatch(getObjects(ceKeys, instance))
      .then(handleResponse)
      .then(r => r.json())
      .then(r => {
        console.log('Retrieve objects success', r);
        dispatch(objectRetrievalSuccess({[elementKey]: r}));
        if (successCallback) {
          successCallback(r);
        }
      })
      .catch(e => {
        console.error('Retrieve objects failed', e);
        dispatch(objectRetrievalFailure(e));
        dispatch(alertFailure(`Could not retrieve objects for ${elementKey}`));
    });
  };
};