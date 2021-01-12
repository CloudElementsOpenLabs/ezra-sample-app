## Overview

The Ezra Sample Application is a full simple application for React/Redux, demonstrating the use of Cloud Elements APIs in a UI. The primary goal is to demonstrate the use of the unified provisioning service (Ezra) to connect various integrations with ease. 

> Keep in mind that Cloud Elements is a server-side API library, production applications should not store keys or make API calls directly from client-side code. This project is merely a source of sample code intended as a tool for gaining familiarity with the Cloud Elements APIs in a user-facing example. If you're interested in a version of this app that contains additional functionality, please file an [issue](https://github.com/CloudElementsOpenLabs/ezra-sample-app/issues/new).

<img width="1187" alt="UI Screenshot" src="https://user-images.githubusercontent.com/13838430/92042857-af1fad00-ed40-11ea-9291-2e75d710a870.gif">

## Features

* Responsive
* Simplified integration provisioning (Ezra)
* [Material UI](https://material-ui.com/) styling
* [Router](https://github.com/supasate/connected-react-router)/[Redux](https://redux.js.org/)/[React](https://reactjs.org/) included
* [Docker](https://www.docker.com/) container for production build

## Prerequisites

### Create an Application (Get an Application ID)

Before running this demo application of standardized auth, you will need to make a single API call to get an `application id` that you can then pass in to your environment variables (`.env` or `.env.local` file).

To do this, make a `POST` request to the following URL with the below request body and headers `https://{environment}.cloud-elements.com/v1alpha1/elements/normalized-instances/applications`.

**Request Body**:
```
{
    "appProvidedElAgnosticMetadata": true,
    "appProvidedElSpecificMetadata": true,
    "notificationCallback": {
        "url": "https://ce-demo-app.free.beeceptor.com"
    },
    "description": "DemoApp",
    "includeCETagline": true,
    "name": "Unified authentication"
}
```
**Request Headers**:
```
'Authorization: User {userToken}, Organization {organizationToken}'
'Content-Type: application/json'
'Accept : application/json'
```
>**Notes**:
>* Make sure you choose an environment (staging, snapshot, or production) and pass it into the above URL.
>* Make sure your User and Organization secrets are from the environment you choose.


**Example cUrl**:

```
curl --location --request POST 'https://staging.cloud-elements.com/v1alpha1/elements/normalized-instances/applications' \
--header 'Authorization: User ----, Organization ----' \
--header 'Content-Type: application/json' \
--data-raw '{
    "appProvidedElAgnosticMetadata": true,
    "appProvidedElSpecificMetadata": true,
    "notificationCallback": {
        "url": "https://ce-demo-app.free.beeceptor.com"
    },
    "description": "DemoApp",
    "includeCETagline": true,
    "name": "Unified authentication"
}'
```

**Response Body**:
```
{
    "applicationID": "123456abc-defg-123a-bcd5-edf8142324fc",
    "name": "Unified authentication",
    "description": "DemoApp",
    "appProvidedElementSpecificConfig": false,
    "appProvidedElementAgnosticConfig": false,
    "identityID": "75f3deea-613d-4dbd-b17c-16cedc3ef176",
    "createdDate": "2021-01-12 12:45:57",
    "updatedDate": "2021-01-12 12:45:57",
    "notificationCallback": {
        "url": "https://ce-demo-app.free.beeceptor.com",
        "format": "json",
        "token": "FGVOK0FV51dW2BUN3xWb"
    },
    "branding": {
        "headerFontColor": "",
        "headerFontType": "",
        "logo": "",
        "backgroundColor": "",
        "formLabelFontColor": "",
        "formLabelFontType": "",
        "formInputFontType": "",
        "formInputBorderColor": "",
        "formInputBorderRadius": "",
        "formInputBackgroundColor": "",
        "formInputPasswordIconColor": "",
        "radioFieldColor": "",
        "dropdownFieldFontType": "",
        "dropdownFieldBorderColor": "",
        "dropdownFieldBorderRadius": "",
        "dropdownFieldBackgroundColor": "",
        "buttonBorderColor": "",
        "buttonBorderRadius": "",
        "buttonBackgroundColor": "",
        "buttonFontType": "",
        "buttonFontColor": "",
        "optionalGuidanceMessageFontType": "",
        "optionalGuidanceMessageFontColor": "",
        "disclaimerFontType": "",
        "disclaimerFontColor": "",
        "linkFontType": "",
        "linkFontColor": "",
        "errorMessageBackgroundColor": "",
        "errorMessageFontColor": "",
        "errorMessageFontType": "",
        "includeCETaglineLink": false,
        "linkOne": {
            "text": "",
            "link": ""
        },
        "linkTwo": {
            "text": "",
            "link": ""
        },
        "linkThree": {
            "text": "",
            "link": ""
        }
    }
}
```
* Make sure to grab the `applicationID` from the response body of your POST request.

### Environment Variables

This application requires an [envirionment file](https://create-react-app.dev/docs/adding-custom-environment-variables/) to run. The environment file contains desired environment, application IDs, and OAuth keys that are referenced throughout the project in the interest of keeping it easily adjustable. A sample environment file has been provided for you in [.env](https://github.com/CloudElementsOpenLabs/ezra-sample-app/blob/main/.env). However, you can create a local environment file to override it:

```bash
 $ touch .env.local
 ```

#### Step 1
Add your Cloud Elements keys to the `.env.local` file:

```
## Cloud Elements keys/environment
REACT_APP_CE_USER={your-cloud-elements-user-token}
REACT_APP_CE_ORG={your-cloud-elements-org-token}
REACT_APP_CE_ENV=[optional for using staging or snapshot, app defaults to production]
```

The user and org tokens can be found on Cloud Elements UI, in the user profile popout on the bottom left. For example: https://my-snapshot.cloudelements.io/welcome

---

#### Step 2
Add your vendor OAuth app keys to the `.env.local` file. Only one set is needed for the app to function, but the total number is unlimited. These keys are utilized in the [LoginCardList component](https://github.com/CloudElementsOpenLabs/ezra-sample-app/tree/main/src/components/LoginCardsContainer).

> **Note**: Your vendor OAuth application should have the Ezra callback URL registered, ie one of: `https://provisioning.snapshot.us.cloudelements.io/callback`, `https://provisioning.staging.us.cloudelements.io/callback`, or `https://provisioning.production.us.cloudelements.io/callback`. You will add this callback URL as a redirect uri when you create a vendor app.

```
## Vendor App keys
REACT_APP_HUBSPOT_KEY={your-hubspot-oauth-app-key}
REACT_APP_HUBSPOT_SECRET={your-hubspot-oauth-app-secret}
```

---

#### Step 3
Add the `applicationID` from the response body you received when creating your application (prerequisite step above).

```
# Provisioning service application ID
REACT_APP_EZRA_APP_ID={your-applicationID}
```

Now you are ready to run the app!

## Installation

### Docker
Skip any dependencies and just run the following to get started:

```bash
$ docker-compose -f deploy/docker-compose.yaml up --build
```
### Node

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

## Running

### Docker
```bash
$ docker-compose -f deploy/docker-compose.yaml up --build
```

### YARN/NPM

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
