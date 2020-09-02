import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {AppBar, IconButton, Divider, Drawer, Snackbar, Toolbar, Typography} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {Menu, MenuOpen} from '@material-ui/icons';
import {Route, Switch} from 'react-router-dom';
import {clearAlert} from '../../actions/alert';
import Accounts from '../../pages/Accounts';
import Contacts from '../../pages/Contacts';
import Orders from '../../pages/Orders';
import Integrations from '../../pages/Integrations';
import Settings from '../../pages/Settings';
import Welcome from '../../pages/Welcome';
import {routes} from '../../utils/routes';
import PrimaryNavigation from './PrimaryNavigation';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100vh',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#4d82bf',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
});


class BaseTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
      const { alert, appUrl, classes, ceKeys, updateAlert} = this.props;
      const { open } = this.state;

      return (
        <div className={classes.root}>
          {/* Here's the toolbar */}
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <Menu />
              </IconButton>
              <Typography color="inherit" noWrap>
                {process.env.REACT_APP_TITLE}
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Here's the menu */}
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                <MenuOpen />
              </IconButton>
            </div>
            <Divider />
            <PrimaryNavigation />
          </Drawer>

          {/* Here's the router and primary content */}
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
                <Route exact path={routes.accounts} render={(props) => <Accounts ceKeys={ceKeys} appUrl={appUrl}  {...props} />} />
                <Route exact path={routes.contacts} render={(props) => <Contacts ceKeys={ceKeys} appUrl={appUrl} {...props} />} />
                <Route exact path={routes.orders} render={(props) => <Orders ceKeys={ceKeys} appUrl={appUrl} {...props} />} />
                <Route exact path={routes.integrations} render={(props) => <Integrations ceKeys={ceKeys} appUrl={appUrl} {...props} />} />
                <Route exact path={routes.settings} render={(props) => <Settings ceKeys={ceKeys} appUrl={appUrl} {...props} />} />
                <Route exact path="/" render={(props) => <Welcome ceKeys={ceKeys} appUrl={appUrl} {...props} />} />
            </Switch>
            {/* Section for displaying any alerts to the user */}
            {alert && <Snackbar open={alert.open} autoHideDuration={5000} onClose={updateAlert}>
              <Alert 
                  onClose={updateAlert}
                  severity={alert.alertType || 'info'}
                  elevation={6}
                  variant="filled"
              >
                {alert.message}
              </Alert>
            </Snackbar>}
          </main>
        </div>
      );
  }
}


BaseTemplate.propTypes = {
  alert: PropTypes.shape({
    alertType: PropTypes.string,
    message: PropTypes.string,
    open: PropTypes.bool,
  }),
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object,
};

const mapStateToProps = (state, props) => {
  return {
      alert: state.alert,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      updateAlert: () => dispatch(clearAlert()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BaseTemplate));