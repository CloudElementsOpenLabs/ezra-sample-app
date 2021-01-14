// External dependencies
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Button, Paper, Typography} from '@material-ui/core';
import StyleIcon from '@material-ui/icons/Style';

// Internal dependencies
import {isNilOrEmpty} from '../../utils/ce-util';
import DataDrawer from '../Drawers/DataDrawer';
import {retrieveApplication} from '../../actions/applications';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(3),
    }),
    button: {
        margin: theme.spacing(1),
    },
    cardTitle: {
        fontSize: 26
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
});

const SettingsContainer = ({appDetails, ceKeys, classes, isApplicationLoading, getApplicationDetails, route }) => {
    const [isDrawerOpen, toggleDrawer] = React.useState(false);
    const applicationId = process.env.REACT_APP_EZRA_APP_ID;
    const ezraUiUri = `https://provisioning.${process.env.REACT_APP_CE_ENV}.us.cloudelements.io`;
    const applicationContent = applicationId
        ? `Application ID: ${applicationId}`
        : `No application setup. Please setup an application to continue`;
    
    return ( 
        <React.Fragment>
            {appDetails && <DataDrawer
                getData={() => !isApplicationLoading && getApplicationDetails(ceKeys)}
                data={appDetails}
                title={'Application Details'}
                omitFields={['branding']}
                isOpen={isDrawerOpen}
                toggleDrawer={() => toggleDrawer(!isDrawerOpen)}
            />}
            {/* Application section - likely admin only */}
            <Paper className={classes.root} elevation={4}>
                <Typography component="h2" className={classes.cardTitle}>
                    Application
                </Typography>
                <div className={classes.flexRow}>
                    <Typography component="p" style={{marginTop: 10}}>
                        {applicationContent}
                    </Typography>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        disabled={isNilOrEmpty(applicationId)}
                        onClick={() => toggleDrawer(!isDrawerOpen)}
                    >
                        See details
                    </Button>
                </div>
            </Paper>
            {/* Branding section - likely admin only */}
            <Paper className={classes.root} elevation={4}>
                <Typography component="h2" className={classes.cardTitle}>
                    Branding
                </Typography>
                <div className={classes.flexRow}>
                    <Typography component="p" style={{marginTop: 10}}>
                        Set up your branding for your application!
                    </Typography>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<StyleIcon />}
                        onClick={() => {
                            const brandingWindow = window.open('', '_blank');
                            brandingWindow.location.href = `${ezraUiUri}/branding`;
                        }}
                    >
                        Setup Branding
                    </Button>
                </div>
            </Paper>
        </React.Fragment>
    );
};

SettingsContainer.propTypes = {
    appDetails: PropTypes.object,
    classes: PropTypes.object.isRequired,
    ceKeys: PropTypes.object.isRequired,
    isApplicationLoading: PropTypes.bool.isRequired,
    getApplicationDetails: PropTypes.func.isRequired,
    theme: PropTypes.object,
};

const mapStateToProps = (state, props) => {
    return {
        isApplicationLoading: state.applications.loading,
        appDetails: state.applications.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getApplicationDetails: (ceKeys) => dispatch(retrieveApplication(ceKeys))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SettingsContainer));