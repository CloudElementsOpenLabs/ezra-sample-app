## General

The `General` directory contains the components for adding drawers to a page.

For the contents:
* The [BaseTemplate.jsx](https://github.com/cloud-elements/ezra-sample-app/blob/main/src/components/General/BaseTemplate.jsx) builds the generic template for the application. This includes a application title, toolbar, navigation, alerting and the container for the primary content.
* The [Mask.jsx](https://github.com/cloud-elements/ezra-sample-app/blob/main/src/components/General/Mask.jsx) is a simple component to provide a loading screen and mask over the content. This is a wrapper around the [material-ui Backdrop component](https://material-ui.com/components/backdrop/).
* The [PrimaryNavigation.jsx](https://github.com/cloud-elements/ezra-sample-app/blob/main/src/components/General/PrimaryNavigation.jsx) builds the left hand side navigation leveraged in the `BaseTemplate`. This offers a wrapper around the [material-ui List component](https://material-ui.com/components/lists/) to perform routing to the other pages in the application.
* The [WelcomeBox.jsx](https://github.com/cloud-elements/ezra-sample-app/blob/main/src/components/General/WelcomeBox.jsx) is a simple component to welcome the user to the application on the root page.