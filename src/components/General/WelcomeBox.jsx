// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing(3),
    }),
    cardTitle: {
        'font-size': 26
    }
});

const WelcomeCard = ({ classes }) => {
    return (
        <React.Fragment>
            <Paper className={classes.root} elevation={4}>
                <Typography component="h2" className={classes.cardTitle}>
                    Welcome to your integrated application boilerplate app!
                </Typography>
                <Typography component="p" style={{ marginTop: 10 }}>
                    Use the menu to connect to some apps or view sample data before connecting to other data services.
                </Typography>
            </Paper>
        </React.Fragment>
    );
}

WelcomeCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object,
};

export default withStyles(styles)(WelcomeCard);