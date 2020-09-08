// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Drawer, Typography, TextField} from '@material-ui/core';

// Internal dependencies
import {createTitleText, isObject, isNilOrEmpty} from '../../utils/ce-util';

const styles = theme => ({
  cardTitle: {
      fontSize: 26
  },
  divMargin: {
      margin: '.75rem 0',
  },
  flexRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline'
  },
  drawerTitle: {
      fontSize: 26,
      alignSelf: 'center',
      paddingTop: '1rem'
  },
  drawerContent: {
      '& > *': {
        margin: theme.spacing(1),
      },
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
  },
  drawerInputContent: {
      height: '87%',
      background: '#F0F0F0',
      padding: '0 1rem',
      border: '1px solid lightgray',
      overflow: 'scroll',
  }
})

const DataDrawer = ({ classes, theme, isOpen, toggleDrawer, getData, data, title, omitFields = [], multiLineFields = []}) => {
  const retrieveTextField = (key, value, multiline = false, readOnly = true) => (
    multiline
      ? <TextField
          id={`multiline-read-only-input-for-${key}`}
          key={key}
          label={createTitleText(key)}
          defaultValue={value}
          fullWidth
          multiline
          rowsMax={4}
          variant="outlined"
          InputProps={{
              readOnly,
          }}
        />
      : <TextField
          id={`standard-read-only-input-for-${key}`}
          key={key}
          label={createTitleText(key)}
          defaultValue={value}
          fullWidth
          variant="outlined"
          InputProps={{
              readOnly,
          }}
        />
    );

  const retrieveTextFields = (details) => {
      return Object.keys(details)
          .filter(key => !omitFields.includes(key))
          .map(key => {
              const value = details[key];
              return isObject(value)
                  ? (<div key={`div-${key}`} className={classes.divMargin}>
                        <h3>{createTitleText(key)}</h3>
                        {retrieveTextFields(value)}
                     </div>)
                  : <div key={`div-${key}`} className={classes.divMargin}>{retrieveTextField(key, value, multiLineFields.includes(key))}</div>;
          });
  }

  return (
    <Drawer 
      anchor={'right'}
      open={isOpen}
      className={classes.drawer}
      PaperProps={{
          style: {
              minWidth: '33%'
          }
      }}
      onClose={() => toggleDrawer()}>
      {isNilOrEmpty(data)
          ? (<p>Loading</p>) && getData()
          : (<form className={classes.drawerContent} noValidate autoComplete="off">
              <Typography component="h2" className={classes.drawerTitle}>
                  {title}
              </Typography>
              <div className={classes.drawerInputContent}>
                  {retrieveTextFields(data)}
              </div>
          </form>)
      }
  </Drawer>);
}

DataDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object,
};

export default withStyles(styles)(DataDrawer);