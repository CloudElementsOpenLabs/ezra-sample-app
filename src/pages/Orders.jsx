// External dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal dependencies
import DataTableWrapper from '../components/DataDashboard/DataTableWrapper';

const Orders = ({ ceKeys, appUrl, route = 'orders' }) => {

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

Orders.propTypes = {
  ceKeys: PropTypes.object.isRequired,
  appUrl: PropTypes.string.isRequired,
  route: PropTypes.string,
};

export default Orders;