## DataDashboard

The DataDashboard directory contains the components that construct the contents of the `contacts`, `accounts`, and `orders` pages.

For the contents:
* The [DataTable.jsx](https://github.com/CloudElementsOpenLabs/ezra-sample-app/blob/main/src/components/DataDashboard/DataTable.jsx) builds the generic data table, (_title, header, body_).
* The [DataTableWrapper.jsx](https://github.com/CloudElementsOpenLabs/ezra-sample-app/blob/main/src/components/DataDashboard/DataTableWrapper.jsx) builds a wrapper on the `DataTable` component. *Note:* _It has a loose implementation for retrieving live data from an integration, but still needs work (see https://github.com/CloudElementsOpenLabs/ezra-sample-app/issues/3)._
* The [dummyDataGenerator.js](https://github.com/CloudElementsOpenLabs/ezra-sample-app/blob/main/src/components/DataDashboard/dummyDataGenerator.js) generates the sample header and data contents for the table.
