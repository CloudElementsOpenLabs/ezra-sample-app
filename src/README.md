## Source Code Contents

The `/src` directory contains all the source code for the project. 

* The [actions](https://github.com/cloud-elements/ezra-sample-app/tree/main/src/actions) contains the ways that we mutate our global state (store). In this application, primarily, they are used to make API calls on behalf of the user - leveraging the fetch command.
* The [components](https://github.com/cloud-elements/ezra-sample-app/tree/main/src/components) directory contains (_somewhat_) reuasble JS visual compositions. It primarily leverages or extends [material-ui components](https://material-ui.com/components).
* The [pages](https://github.com/cloud-elements/ezra-sample-app/tree/main/src/pages) directory contains pages that call out to specific components.
* The [reducers](https://github.com/cloud-elements/ezra-sample-app/tree/main/src/reducers) directory contains the ways that we mutate our global state (store) based on types. 
* The [utils](https://github.com/cloud-elements/ezra-sample-app/tree/main/src/utils) directory contains common utility functions and constants for the application.
* The [index.js](https://github.com/cloud-elements/ezra-sample-app/blob/main/src/index.js) is the starting point for the React application. Additionally, there's a few other things setup here:
  * The `Redux` provider and store to establish connectivity and global state. 
  * The `ConnectedRouter` provides `React`/`Redux` routing within the application.
  * The store subscription, which continuously propagates the `Redux` state to the local storage to preserve the session.
* The [store.js](https://github.com/cloud-elements/ezra-sample-app/blob/main/src/store.js) provides the reducers, initial state, and middlewares for `Redux` to work properly. This is leveraged by the `index.js`. For debugging purposes, I've also included [redux-logger](https://github.com/LogRocket/redux-logger) to easily track `Redux` actions.
* The [App.jsx](https://github.com/cloud-elements/ezra-sample-app/blob/main/src/App.jsx) is the starting point for the actual application code. It wraps the internal [BaseTemplate](https://github.com/cloud-elements/ezra-sample-app/blob/main/src/components/General/BaseTemplate.jsx) with a theme. 