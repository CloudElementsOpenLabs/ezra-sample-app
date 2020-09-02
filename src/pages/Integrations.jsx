import React from 'react';
import PropTypes from 'prop-types';
import LoginCardList from '../components/LoginCardsContainer/LoginCardList';

const Integrations = ({ ceKeys, appUrl }) => {

  return (
      <React.Fragment>
          <LoginCardList
            ceKeys={ceKeys}
            appUrl={appUrl}
          />
      </React.Fragment>
  );
}

Integrations.propTypes = {
  ceKeys: PropTypes.object.isRequired,
  appUrl: PropTypes.string,
};

export default Integrations;