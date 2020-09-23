// External dependencies
import queryString from 'query-string';

// Internal dependencies
import {INSTANCE_DELETION_SUCCESS, INSTANCE_DELETION_FAILURE, INSTANCE_CREATING, INSTANCE_SUCCESS, INSTANCE_FAILURE} from './action-types';
import {alertFailure, alertSuccess} from './alert';
import {handleResponse} from '../utils/ce-util';

const instanceCreating = activeElement => ({type: INSTANCE_CREATING, activeElement});
const instanceSuccess = data => ({type: INSTANCE_SUCCESS, data});
export const instanceFailure = error => ({type: INSTANCE_FAILURE, error});
const instanceDeletionSuccess = elementKey => ({type: INSTANCE_DELETION_SUCCESS, elementKey});
const instanceDeletionFailure = error => ({type: INSTANCE_DELETION_FAILURE, error});

/**
 * Message handler for the OAuth window
 * @param {Event} event 
 * @param {Promise} res 
 * @param {Promise} rej 
 * @param {Function} handler
 */
const handleOAuthLoginEvent = (event, res, rej, handler) => {
  if (window.location.href.indexOf(event.origin) === 0) {
      rej({message: 'Failed to retrieve OAuth2 information'});
      window.removeEventListener('message', handler);
      return;
  }

  // Optional: ignore if it didn't come from an approved origin or if the data is not on the message yet
  // const approvedOauthResponders = ['https://provisioning.snapshot.us.cloudelements.io'];
  // if (!approvedOauthResponders.includes(event.origin) || isNil(event.data)) {
  //     return;
  // }

  const eventData = event.data;
  console.log('Received event.data message', eventData);
  if (!eventData || !eventData.success) {
    rej({message: `Failed to retrieve instance data from: ${JSON.stringify(event.data)}, ${JSON.stringify(eventData.error)}`});
  }

  res({data: eventData.data});
};

/**
 * OAuth login handler. This does the following:
 *  1. Redirects window to the oauthUrl
 *  2. Sets up the event listener
 *  3. Continuously let the window know we're ready to receive the message
 * @param {Window} oauthWindow 
 * @param {String} oauthUrl
 */
const handleOAuthLogin = (oauthWindow, oauthUrl) => {
  let intervalId, messageHandler;
  return new Promise((res, rej) => {
      // this shouldn't happen with the way we're passing down the oauthWindow from the original onClick event
      // as that works around when someone has popups blocked.  but just in case we'll check here...
      if (!oauthWindow) {
          rej({message: 'Please enable popups in your browser to create OAuth element instances'});
          return;
      }
      console.log('Redirecting to', oauthUrl);
  
      // send the window to the oauth url
      oauthWindow.location.href = oauthUrl;
  
      intervalId = window.setInterval(() => {
      try {
          oauthWindow.postMessage({ready: true}, '*');
      } catch(e) {
          // Do nada
      }}, 500);
  
      messageHandler = evt => handleOAuthLoginEvent(evt, res, rej, messageHandler);
  
      window.addEventListener('message', messageHandler);
  }).finally(() => {
      clearInterval(intervalId);
      window.removeEventListener('message', messageHandler);
  });
};

/**
 * API call for creating an authenticated UI session that returns a URL that lasts 500 seconds. The full API call looks like:
 * curl 'https://snapshot.cloud-elements.com/v1alpha1/elements/normalized-instances/applications/{applicationId}/sessions?apiKey=<VENDOR_API_KEY>&apiSecret=<VENDOR_API_SECRET>&elementKey=<ELEMENT_KEY>' \
    -X 'POST' \
    -H 'Accept: application/json' \
    -H 'Authorization: <AUTHORIZATION TOKEN>' \
    -H 'Content-Type: application/json' \
    --compressed
 * @param {Object} ceKeys 
 * @param {Object} data 
 * @param {String} instanceId
 */
const createSession = (ceKeys, data, instanceId = "") => {
  return () => {
    const applicationId = process.env.REACT_APP_EZRA_APP_ID;
    const baseEzraUrl = process.env.REACT_APP_EZRA_APP_URI;
      // The query parameters with the api key, api secret and element key
    const queryParams = queryString.stringify({
      apiKey: data.vendorApiKey,
      apiSecret: data.vendorSecret,
      elementKey: data.elementKey,
      instanceId, // only included when you wish to update an existing connection
    });
    // the normalized Cloud Elements URL for retrieving an OAuth redirect
    const path = `${applicationId}/sessions`;
    // place everything above into an object for fetch to use
    const config = {
      method: 'POST',
      headers: {
          'Authorization': `User ${ceKeys.userToken}, Organization ${ceKeys.orgToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
    };

    return fetch(`${baseEzraUrl}/${path}?${queryParams}`, config);
  };
};

/**
 * Retrieve the OAuth redirect URL to create an instance for a particular element integration.
 * @param {Object} ceKeys 
 * @param {Object} vendorData 
 */
export const getCreateOAuthRedirectUrl = (ceKeys, vendorData) => {
  const elementKey = vendorData.elementKey;
  return (dispatch) => {
    dispatch(instanceCreating({key: elementKey, name: vendorData.nameText}));
    return dispatch(createSession(ceKeys, vendorData))
      .then(handleResponse)
      .then(r => r.json())
      .then(r => {
        const redirectUrl = r.redirectUrl;
        // Redirect user to url generated by Cloud Elements
        const oauthWindow = window.open('', '_blank');
        return handleOAuthLogin(oauthWindow, redirectUrl);
      })
      .then(r => {
        const key = r.data.elementInstance.element.key || elementKey;
        console.log('Connection creation success', r);
        dispatch(instanceSuccess({ [key] : r.data.elementInstance }));
        dispatch(alertSuccess("Connection created successfully"));
    })
      .catch(e => {
        console.error('Connection creation failed', e);
        dispatch(instanceFailure(e));
        dispatch(alertFailure("Connection creation failed"));
    });
  };
};

/**
 * Retrieve the OAuth redirect URL to update an instance for a particular element integration.
 * @param {Object} ceKeys 
 * @param {Object} vendorData 
 */
export const getUpdateOAuthRedirectUrl = (ceKeys, vendorData, instanceId) => {
  const elementKey = vendorData.elementKey;
  return (dispatch) => {
    dispatch(instanceCreating({key: elementKey, name: vendorData.nameText}));
    return dispatch(createSession(ceKeys, vendorData, instanceId))
      .then(handleResponse)
      .then(r => r.json())
      .then(r => {
        const redirectUrl = r.redirectUrl;
        // Redirect user to url generated by Cloud Elements
        const oauthWindow = window.open('', '_blank');
        return handleOAuthLogin(oauthWindow, redirectUrl);
      })
      .then(r => {
        const key = r.data.elementInstance.element.key || elementKey;
        console.log('Connection update success', r);
        dispatch(instanceSuccess({ [key] : r.data.elementInstance }));
        dispatch(alertSuccess("Connection updated successfully"));
    })
      .catch(e => {
        console.error('Connection update failed', e);
        dispatch(instanceFailure(e));
        dispatch(alertFailure("Connection update failed"));
    });
  };
};

/**
 * API call for deleting an instance for a particular element integration.
 * @param {Object} ceKeys 
 * @param {Object} instance 
 */
const deleteInstance = (ceKeys, instance) => {
  return () => {
    const baseUrl = process.env.REACT_APP_CE_ENV_URI;
    // place everything above into an object for fetch to use
    const config = {
        method: 'DELETE',
        headers: {
            'Authorization': `User ${ceKeys.userToken}, Organization ${ceKeys.orgToken}`,
            'Accept': 'application/json'
        }
    };
    return fetch(`${baseUrl}/elements/api-v2/instances/${instance.id}`, config);
  };
};

/**
 * Delete an instance for a particular element integration.
 * @param {Object} ceKeys 
 * @param {Object} instance 
 */
export const removeInstance = (ceKeys, instance) => {
  const elementKey = instance.element.key;
  return (dispatch) => {
    return dispatch(deleteInstance(ceKeys, instance))
      .then(handleResponse)
      .then(r => {
        console.log('Connection removal success', r);
        dispatch(instanceDeletionSuccess(elementKey));
        dispatch(alertSuccess("Connection deleted successfully"));
    })
      .catch(e => {
        console.error('Connection removal failed', e);
        dispatch(instanceDeletionFailure(e));
        dispatch(alertFailure("Connection deleted failed"));
    });
  };
};

/**
 * API call for check aliveness for a particular element integration.
 * @param {Object} ceKeys 
 * @param {Object} instance 
 */
const pingInstance = (ceKeys, instance) => {
  return () => {
    const baseUrl = process.env.REACT_APP_CE_ENV_URI;
    // place everything above into an object for fetch to use
    const config = {
        method: 'GET',
        headers: {
            'Authorization': `User ${ceKeys.userToken}, Organization ${ceKeys.orgToken}, Element ${instance.token}`,
            'Accept': 'application/json'
        }
    };
    return fetch(`${baseUrl}/elements/api-v2/ping`, config);
  };
};

/**
 * Notify whether the connection is working or not
 * @param {Object} ceKeys 
 * @param {Object} instance 
 */
export const pingInstanceForValidity = (ceKeys, instance) => {
  return (dispatch) => {
    return dispatch(pingInstance(ceKeys, instance))
      .then(handleResponse)
      .then(r => r.json())
      .then(r => {
        console.log('Connection check success', r);
        dispatch(alertSuccess(`Connection is ${r.valid ? 'working': 'broken'}`));
    })
      .catch(e => {
        console.error('Connection check failed', e);
        dispatch(alertFailure("Connection is broken"));
    });
  };
};