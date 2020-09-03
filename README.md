## Overview

The Ezra Sample Application is a full simple application for React/Redux, demonstrating the use of Cloud Elements APIs in a UI. The primary goal is to demonstrate the use of the unified provisioning service (Ezra) to connect various integrations with ease. 

> Keep in mind that Cloud Elements is a server-side API library, production applications should not store keys or make API calls directly from client-side code. This project is merely a source of sample code intended as a tool for gaining familiarity with the Cloud Elements APIs in a user-facing example. If you're interested in a version of this app that contains additional functionality, please file an [issue](https://github.com/cloud-elements/ezra-sample-app/issues/new).

<img width="1187" alt="UI Screenshot" src="https://user-images.githubusercontent.com/13838430/92042857-af1fad00-ed40-11ea-9291-2e75d710a870.gif">

## Installation
If you don't have `node` and `npm` installed, do [that](https://docs.npmjs.com/getting-started/installing-node) first.

> The project was developed on `node` version `v10.20.1` and `npm` version `6.14.4`. However, `node` version >= `8` and `npm` version >= `4.1.2` should suffice.

Navigate into the project directory and install package dependencies.

```bash
# Make sure you are in the correct directory
$ cd ezra-sample-app

# Install all necessary npm packages:
$ npm install
# or
$ yarn install
```

This application requires an [envirionment file](https://create-react-app.dev/docs/adding-custom-environment-variables/) to run. The environment file contains URLs, application IDs, and OAuth keys that are referenced throughout the project in the interest of keeping it easily adjustable. A sample environment file has been provided for you in [.env](https://github.com/cloud-elements/ezra-sample-app/blob/main/.env). However, you can create a local environment file to override it:

```bash
 $ touch .env.local
 ```

Add your Cloud Elements keys to the `.env.local` file:

```
## Cloud Elements keys
REACT_APP_CE_USER={your-cloud-elements-user-token}
REACT_APP_CE_ORG={your-cloud-elements-org-token}
REACT_APP_CE_ENV=[optional for using staging or snapshot, app defaults to production]
```

Add your vendor OAuth app keys to the `.env.local` file. Only one set is needed for the app to function, but total number is unlimited. These keys are utilized in the [LoginCardList component](https://github.com/cloud-elements/ezra-sample-app/tree/main/src/components/LoginCardsContainer).

```
## Vendor App keys
REACT_APP_HUBSPOT_KEY={your-hubspot-oauth-app-key}
REACT_APP_HUBSPOT_SECRET={your-hubspot-oauth-app-secret}
```

Add the https url where your app is available so that vendor OAuth flows know where to return to after a user signs in.

```
## Misc
REACT_APP_URL=https://c720e32b.ngrok.io
```

## Running
```bash
# Fire that bad boy up:
$ yarn start
# or
$ npm start
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

#### `npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
