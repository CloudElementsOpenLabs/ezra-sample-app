// External dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableHead, TableBody, TableCell, TableRow, Toolbar, Typography } from '@material-ui/core';

// Internal dependencies
import { createTitleText } from '../../utils/ce-util';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(3) - 4,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Datatable extends Component {
  render() {
    const { classes, contentType, headers, data } = this.props;
    // convert contents to title
    const title = createTitleText(contentType);
    return (
      <Paper className={classes.root}>
        <Toolbar>
          <Typography color="inherit">
            {title}
          </Typography>
        </Toolbar>
        <Table className={classes.table}>
          <TableHead>
            <TableRow key={'header'}>
              {headers.map(headerText => (
                <TableCell key={headerText}>{headerText}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.id}>
                {headers.map((headerText) => (
                  <TableCell key={row[headerText]}>{row[headerText]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  };
}

Datatable.propTypes = {
  classes: PropTypes.object.isRequired,
  contentType: PropTypes.string.isRequired,
  headers: PropTypes.object,
  data: PropTypes.object,
};

export default withStyles(styles)(Datatable);