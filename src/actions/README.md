## Actions

You can reference [Redux](https://redux.js.org/basics/actions) for details on actions.

The actions directory contains the ways that we mutate our global state (store). In this application, primarily, they are used to make API calls on behalf of the user - leveraging the `fetch` command. 

For the contents:
* The `alert` action controls the `alert` object state, which is rendered in the [BaseTemplate](https://github.com/cloud-elements/ezra-sample-app/blob/main/src/components/General/BaseTemplate.jsx)
* The `applications` action controls the `application` object state, which is rendered in the [SettingsPage](https://github.com/cloud-elements/ezra-sample-app/blob/main/src/components/SettingsPage/SettingsContainer.jsx)
* The `objects` action controls the `objects` object state, which is rendered in the [LoginCardsContainer](https://github.com/cloud-elements/ezra-sample-app/tree/main/src/components/LoginCardsContainer)
* The `instances` action controls the `instance` object state, which is rendered in the [LoginCardsContainer](https://github.com/cloud-elements/ezra-sample-app/tree/main/src/components/LoginCardsContainer)
    * The create instance action flow:
      1. Dispatches an API call to the unified provisioning service to get a OAuth URL
      2. Creates a new tab window redirecting to the specified OAuth URL
      3. Sets up a listener to for a recipient message from that tab
      4. In the new window, it'll prompt for credentials
      5. After successful OAuth exchange, it'll pass a data/status message back to the original opener window
      6. Dispatches a success/failure action to the store
      7. Dispatches a success/failure alert to the store
    * ![](https://github.com/cloud-elements/ezra-sample-app/blob/main/public/ezra_customer_sequence.json)
