// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {withRouter, Link} from 'react-router-dom';

// Internal dependencies
import ContactIcon from '@material-ui/icons/Contacts';
import IntegrationIcon from '@material-ui/icons/Extension';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountIcon from '@material-ui/icons/Work';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {routes} from '../../utils/routes';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

const NavListItem = ({primary, to, icon, handleClick, index, selectedIndex}) => {
  // Ref: https://material-ui.com/guides/composition/#react-router
  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to],
  );

  return (
      <ListItem
        button
        onClick={(event) => handleClick(event, index)}
        component={CustomLink}
        selected={index === selectedIndex}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
  );
};

const PrimaryNavigation = ({ classes }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav">
        <NavListItem
          primary='Contacts'
          to={routes.contacts}
          icon={<ContactIcon />}
          index={1}
          handleClick={handleListItemClick}
          selectedIndex={selectedIndex}
        />
        <NavListItem
          primary='Accounts'
          to={routes.accounts}
          icon={<AccountIcon />}
          index={2}
          handleClick={handleListItemClick}
          selectedIndex={selectedIndex}
        />
        <NavListItem
          primary='Orders'
          to={routes.orders}
          icon={<ShoppingCartIcon />}
          index={3}
          handleClick={handleListItemClick}
          selectedIndex={selectedIndex}
        />
      </List>
      <Divider />
      <List component="nav">
        <NavListItem
          primary='Integrations'
          to={routes.integrations}
          icon={<IntegrationIcon />}
          index={4}
          handleClick={handleListItemClick}
          selectedIndex={selectedIndex}
        />
        <NavListItem
          primary='Settings'
          to={routes.settings}
          icon={<SettingsIcon />}
          index={5}
          handleClick={handleListItemClick}
          selectedIndex={selectedIndex}
        />
      </List>
    </div>
  );
};

PrimaryNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(PrimaryNavigation));