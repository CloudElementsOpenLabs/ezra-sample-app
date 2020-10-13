## Reducers

You can reference [Redux](https://redux.js.org/basics/reducers) for details on reducers.

The reducers directory contains the ways that we mutate our global state (store) based on types. 

For the contents:
* The [alert](https://github.com/CloudElementsOpenLabs/ezra-sample-app/blob/main/src/reducers/alert.js) reducer swaps between a `null` and an object state with keys, `alertType`, `message`, and `open`
* The [applications](https://github.com/CloudElementsOpenLabs/ezra-sample-app/blob/main/src/reducers/applications.js) reducer has keys `loading`, `data`, and `error`
* The [instances](https://github.com/CloudElementsOpenLabs/ezra-sample-app/blob/main/src/reducers/instances.js) reducer has keys `loading`, `data`, `error`, and `activeElement`. Currently, this only stores a single instance at a time. The `data` object expects the `elementKey` as the object key and the instance is the value. 
* The [objects](https://github.com/CloudElementsOpenLabs/ezra-sample-app/blob/main/src/reducers/objects.js) reducer has keys `loading`, `data`, and `error`

### Example State

> Details eliminated for brevity

```json
{
  "alert": {
    "alertType": "success",
    "message": "Connection created successfully",
    "open": true
  },
  "applications": {
    "loading": false,
    "data": {
      "applicationID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
      "name": "Test Application",
      "description": "This is an example application",
      "appProvidedElementSpecificConfig": false,
      "appProvidedElementAgnosticConfig": false,
      "createdDate": "2020-09-03 11:52:31",
      "updatedDate": "2020-09-03 11:52:31",
      "notificationCallback": {
        "url": "https://example.com",
        "format": "json",
        "token": "XXXXXXXXXXXXXXXXX"
      }
    },
    "error": null
  },
  "instances": {
    "loading": false,
    "data": {
      "sfdc": {
        "id": 285160,
        "name": "2020-09-03T16:56:02.859Z",
        "token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "valid": true,
        "disabled": false,
        "configuration": {},
        "element": {
          "id": 23,
          "name": "Salesforce Sales Cloud",
          "key": "sfdc",
          "description": "Add a Salesforce Instance to connect your existing Salesforce account to the CRM Hub, allowing you to manage contacts, leads, accounts, opportunities etc. across multiple CRM Elements or your other Salesforce services. You will need your Salesforce account information to add an instance.",
          "image": "elements/provider_sfdc.png",
          "logo": "sfdc",
          "active": true,
          "deleted": false
        }
      },
      "hubspot": {...}
      }
    },
    "error": null,
    "activeElement": {
      "key": "sfdc",
      "name": "Salesforce"
    }
  },
  "objects": {
    "loading": false,
    "data": {
      "sfdc": [
        "Account",
        "Contact",
        ...
      ],
      "hubspot": [
        "folders",
        "timelineEventtypeProperties",
        "accountsPropertygroups",
        "workflows",
        "formsSubmissions",
        "timelineEvents",
        "companies",
        "campaigns",
        "lists",
        "timelineEventTypes",
        "deals",
        "files",
        "accountsProperties",
        "contacts",
        "events",
        "forms"
      ]
    },
    "error": null
  },
  "router": {
    "location": {
      "pathname": "/settings",
      "search": "",
      "hash": "",
      "key": "0z8eo8",
      "query": {}
    },
    "action": "PUSH"
  }
}
```