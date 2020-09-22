/* eslint-disable import/first */
// External dependencies
import React from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardMedia, CardHeader} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';;
import PropTypes from 'prop-types';

// Internal dependencies
import ConnectButton from './ConnectButton';
import {pingInstanceForValidity, getCreateOAuthRedirectUrl, removeInstance, getUpdateOAuthRedirectUrl} from '../../../actions/instances';

const styles = theme => ({
    loginCard: {
        margin: '20px',
        float: 'left',
        width: '262px'
    },
    cardHeader: {
        height: '69px',
        alignItems: 'unset',
        overflow: 'scroll',
    },
    cardMedia: {
        objectFit: 'unset',
        padding: '.5rem 0 .5rem 0',
        borderTop: '1px solid #F0F0F0',
    },
    cardActions: {
        background: '#F0F0F0',
        justifyContent: 'flex-end'
    }
  });

const LoginCard = ({ ceKeys, classes, checkConnection, createConnection, deleteConnection, instance, isConnected, toggleDrawer, updateConnection, vendorData }) => {
    const {nameText, logo} = vendorData;
    const cardSubHeader = isConnected
        ? `${nameText} is connected.`
        : `Connect your ${nameText} account`;

    return (
        <Card className={classes.loginCard}>
            <CardHeader
                title={nameText}
                subheader={cardSubHeader}
                className={classes.cardHeader}
                titleTypographyProps={{
                    style: {
                        fontSize: '1.25rem'
                    }
                }}
                subheaderTypographyProps={{
                    style: {
                        lineHeight: '18px',
                        fontSize: '.9rem',
                        paddingTop: '0.2rem',
                        color: isConnected ? '#44c8f5' : null,
                    }
                }}
            />
            <CardMedia
                component="img"
                alt={nameText}
                height="140"
                image={logo}
                title={nameText}
                className={classes.cardMedia}
            />
            <CardActions className={classes.cardActions}>
                <ConnectButton
                    ceKeys={ceKeys}
                    checkConnection={checkConnection}
                    connected={isConnected}
                    instance={instance}
                    deleteConnection={deleteConnection}
                    oauthRedirectSend={createConnection}
                    toggleDrawer={toggleDrawer}
                    updateConnection={updateConnection}
                    vendorData={vendorData}
                />
            </CardActions>
        </Card>
    );
};

LoginCard.propTypes = {
    classes: PropTypes.object.isRequired,
    checkConnection: PropTypes.func.isRequired,
    createConnection: PropTypes.func.isRequired,
    deleteConnection: PropTypes.func.isRequired,
    instance: PropTypes.object,
    isConnected: PropTypes.bool,
    toggleDrawer: PropTypes.func.isRequired,
    updateConnection: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    const elementKey = props.vendorData.elementKey;
    const instance = state.instances.data[elementKey];
    return {
        instance,
        isConnected: !!instance, // check existance
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkConnection: (keys, values) => dispatch(pingInstanceForValidity(keys, values)),
        createConnection: (keys, values) => dispatch(getCreateOAuthRedirectUrl(keys, values)),
        deleteConnection: (keys, instance) => dispatch(removeInstance(keys, instance)),
        updateConnection: (keys, values, instanceId) => dispatch(getUpdateOAuthRedirectUrl(keys, values, instanceId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginCard));