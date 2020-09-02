import React from 'react';
import PropTypes from 'prop-types';
import DataTableWrapper from '../components/DataDashboard/DataTableWrapper';

const Contacts = ({ ceKeys, appUrl, route = 'contacts' }) => {

  return (
      <React.Fragment>
          <DataTableWrapper
            contentType={route}
            ceKeys={ceKeys}
            baseUrl={"https://" + [ceKeys.ceEnv || "api"] + ".cloud-elements.com/elements/api-v2"}
          />
      </React.Fragment>
  );
}

Contacts.propTypes = {
  ceKeys: PropTypes.object.isRequired,
  appUrl: PropTypes.string.isRequired,
  route: PropTypes.string,
};

export default Contacts;