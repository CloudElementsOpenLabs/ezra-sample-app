// External dependencies
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {GridList} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// Internal dependencies
import {isNilOrEmpty} from '../../utils/ce-util';
import {retrieveObjects} from '../../actions/objects';
import {instanceFailure} from '../../actions/instances';
import LoginCard from './LoginCard/LoginCard.jsx';
import DataDrawer from '../Drawers/DataDrawer';
import Mask from '../General/Mask';

const styles = theme => ({
    mask: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    loginCardList: {
        margin: '20px',
        padding: '10px',
    }
});

const formatData = (instance, objects) => {
    return isNilOrEmpty(instance) || isNilOrEmpty(objects)
        ? null
        : {
            elementName: instance.element.name,
            instanceId: instance.id,
            name: instance.name,
            objects
         };
};

class LoginCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Authentication tokens specific to each vendor to be included in login options
            // To add more elements, simply add an object to the elements array, for example uncomment the "marketo" object
            isDrawerOpen: false,
            focusedElementKey: null,
            elements: [
                {
                    nameText: "Hubspot Marketing",
                    elementKey: "hubspot",
                    logo: `https://my-${process.env.REACT_APP_CE_ENV}.cloudelements.io/assets/img/elements/hubspot.svg`,
                    vendorApiKey: process.env.REACT_APP_HUBSPOT_KEY,
                    vendorSecret: process.env.REACT_APP_HUBSPOT_SECRET
                },
                {
                    nameText: "Salesforce",
                    elementKey: "sfdc",
                    logo: `https://my-${process.env.REACT_APP_CE_ENV}.cloudelements.io/assets/img/elements/sfdc.svg`,
                    vendorApiKey: process.env.REACT_APP_SFDC_KEY,
                    vendorSecret: process.env.REACT_APP_SFDC_SECRET
                },
                {
                    nameText: "Google AdWords",
                    elementKey: "googleadwords",
                    logo: `https://my-${process.env.REACT_APP_CE_ENV}.cloudelements.io/assets/img/elements/googleadwords.svg`,
                    vendorApiKey: process.env.REACT_APP_GOOGLE_ADWORDS_KEY,
                    vendorSecret: process.env.REACT_APP_GOOGLE_ADWORDS_SECRET,
                    configs: {
                        "google.adwords.developer.token": {
                            type: "string",
                            label: "Set the Base URL"
                        }
                    }
                },
                {
                    nameText: "Pardot by Salesforce",
                    elementKey: "pardot",
                    logo: `https://my-${process.env.REACT_APP_CE_ENV}.cloudelements.io/assets/img/elements/pardot.svg`,
                },
                {
                    nameText: "Marketo",
                    elementKey: "marketo",
                    logo: `https://my-${process.env.REACT_APP_CE_ENV}.cloudelements.io/assets/img/elements/marketo.svg`,
                    vendorApiKey: process.env.REACT_APP_MARKETO_KEY,
                    vendorSecret: process.env.REACT_APP_MARKETO_SECRET,
                    configs: {
                        "base.url": {
                            type: "string",
                            label: "Set the Base URL"
                        },
                        "marketo.identity.url": {
                            type: "string",
                            label: "Set the Identity URL"
                        }
                    }
                },
                {
                    nameText: "Microsoft Dynamics CRM",
                    elementKey: "dynamicscrmadfs",
                    logo: `https://my-${process.env.REACT_APP_CE_ENV}.cloudelements.io/assets/img/elements/dynamicscrmadfs.svg`,
                    vendorApiKey: process.env.REACT_APP_DYNAMICS_KEY,
                    vendorSecret: process.env.REACT_APP_DYNAMICS_SECRET,
                    configs: {
                        "oauth.resource.url": {
                            type: "string",
                            label: "Set the OAuth Resource URL"
                        }
                    }
                },
                {
                    nameText: "Quickbooks",
                    elementKey: "quickbooks",
                    logo: `https://my-${process.env.REACT_APP_CE_ENV}.cloudelements.io/assets/img/elements/quickbooks.svg`,
                    vendorApiKey: process.env.REACT_APP_QUICKBOOKS_KEY,
                    vendorSecret: process.env.REACT_APP_QUICKBOOKS_SECRET,
                    configs: {
                        sandbox: {
                            type: "boolean",
                            label: "Is this a sandbox account?"
                        }
                    }
                },
                {
                    nameText: "Shopify",
                    elementKey: "shopify",
                    logo: `https://my-${process.env.REACT_APP_CE_ENV}.cloudelements.io/assets/img/elements/shopify.svg`,
                    vendorApiKey: process.env.REACT_APP_SHOPIFY_KEY,
                    vendorSecret: process.env.REACT_APP_SHOPIFY_SECRET,
                    configs: {
                        siteAddress: {
                            type: "string",
                            label: "Shopify site address"
                        }
                    }
                },
            ]
        };
    }

    toggleDrawer = (focusedElementKey) => {
        this.setState(prevState => ({isDrawerOpen: !prevState.isDrawerOpen, focusedElementKey}));
    };

    render() {
        // retrieve element data from the state obj above
        const { elements, isDrawerOpen, focusedElementKey } = this.state;
        // retrieve generic app info from the props passed by BaseTemplate.jsx
        const { cancelInstance, ceKeys, classes, latestElementKey, latestElementName, instances, isObjectsLoading, objects, getObjects, showMask } = this.props;
        // pick the one in local state or global state... 
        const selectedElementKey = focusedElementKey || latestElementKey;
        const selectedInstance = instances[selectedElementKey];
        const selectedObjects = objects[selectedElementKey];
        // formatted instance/object data
        const drawerData = formatData(selectedInstance, selectedObjects);

        // return as many LoginCards as needed for the number of elements in the state.elements array
        return (
            <React.Fragment>
                <GridList cols={3} className={classes.loginCardList}>
                    {elements.map(element => (
                        <LoginCard
                            key={element.elementKey}
                            vendorData={element}
                            ceKeys={ceKeys}
                            toggleDrawer={this.toggleDrawer}
                        />
                    ))}
                </GridList>
                <Mask
                    classStyle={classes.mask}
                    showMask={showMask}
                    loadingText={`Connecting to ${latestElementName || 'integration'}...`}
                    toggleMask={cancelInstance}
                />
                {selectedInstance && <DataDrawer
                    getData={() => !isObjectsLoading && getObjects(ceKeys, selectedInstance, () => this.toggleDrawer())}
                    data={drawerData}
                    title={'Details'}
                    multiLineFields={['objects']}
                    isOpen={isDrawerOpen}
                    toggleDrawer={() => this.toggleDrawer()}
                />}
            </React.Fragment>
        );
    }
}

LoginCardList.propTypes = {
    cancelInstance: PropTypes.func.isRequired,
    ceKeys: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    getObjects: PropTypes.func.isRequired,
    objects: PropTypes.shape({
        elementKey: PropTypes.arrayOf(PropTypes.string)
    }),
    latestElementKey: PropTypes.string,
    latestElementName: PropTypes.string,
    isObjectsLoading: PropTypes.bool,
    // More here, but not included for the sake of brevity
    instances: PropTypes.shape({
        elementKey: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            token: PropTypes.string,
            element: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                key: PropTypes.string
            })
        })
    }),
    showMask: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, props) => {
    const latestElement = state.instances.activeElement;
    const latestElementKey = latestElement ? latestElement.key : null;
    const latestElementName = latestElement ? latestElement.name : null;
    return {
        latestElementKey,
        latestElementName,
        objects: state.objects.data,
        isObjectsLoading: state.objects.loading,
        instances: state.instances.data,
        showMask: state.instances.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        cancelInstance: (error) => dispatch(instanceFailure(error)),
        getObjects: (keys, instance, successCallback) => dispatch(retrieveObjects(keys, instance, successCallback)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginCardList));