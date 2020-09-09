// External dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal dependencies
import SettingsContainer from '../components/SettingsPage/SettingsContainer';

const Settings = ({ ceKeys, appUrl }) => {

  return (
      <React.Fragment>
          <SettingsContainer
            ceKeys={ceKeys}
            appUrl={appUrl}
          />
      </React.Fragment>
  );
}

Settings.propTypes = {
  ceKeys: PropTypes.object.isRequired,
  appUrl: PropTypes.string,
};

export default Settings;