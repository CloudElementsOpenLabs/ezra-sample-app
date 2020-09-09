// External dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal dependencies
import LoginCardList from '../components/LoginCardsContainer/LoginCardList';

const Integrations = ({ ceKeys }) => {

  return (
      <React.Fragment>
          <LoginCardList
            ceKeys={ceKeys}
          />
      </React.Fragment>
  );
}

Integrations.propTypes = {
  ceKeys: PropTypes.object.isRequired,
};

export default Integrations;