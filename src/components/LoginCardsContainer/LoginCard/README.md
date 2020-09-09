## LoginCard

The `LoginCard` directory contains the components for rendering the individual integrations on the `/integrations` page.

For the contents:
* The [LoginCard.jsx](https://github.com/cloud-elements/ezra-sample-app/blob/main/src/components/LoginCardsContainer/LoginCard/LoginCard.jsx) leverages the element information from the `LoginCardList` state to initiate, (or maintain) a connection with an integration. The `LoginCard` is an extension around the [material-ui Card component](https://material-ui.com/components/cards/#media).
* The [ConnectButton.jsx](https://github.com/cloud-elements/ezra-sample-app/blob/main/src/components/LoginCardsContainer/LoginCard/ConnectButton.jsx) is a simple button that changes whether the respective element integration is connected. If it is connected, it offers a `Manage` menu to `See details` or `Delete connection`. Otherwise, it offers a simple button to `Connect` to an integration to initiate the OAuth flow.