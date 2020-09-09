// External dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal dependencies
import SettingsContainer from '../components/SettingsPage/SettingsContainer';

const Settings = ({ ceKeys }) => {

  return (
      <React.Fragment>
          <SettingsContainer
            ceKeys={ceKeys}
          />
      </React.Fragment>
  );
}

Settings.propTypes = {
  ceKeys: PropTypes.object.isRequired,
};

export default Settings;