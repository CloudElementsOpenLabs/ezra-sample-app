// External dependencies
import React from "react";
import {Backdrop, Box, Button, CircularProgress, Typography} from '@material-ui/core';

const Mask = ({classStyle, showMask, elementName, toggleMask}) => {
  return (
    <Backdrop className={classStyle} open={showMask}>
      <Box position="relative" display="inline-flex">
          <CircularProgress color="inherit" />
          <Box
              top={'6rem'}
              left={0}
              bottom={0}
              right={0}
              position="fixed"
              display="flex"
              alignItems="center"
              justifyContent="center"
          >
              <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingTop: '4rem'
              }}>
                  <Typography variant="subtitle1" component="p" color="initial">
                      {`Connecting to ${elementName || 'integration'}...`}
                  </Typography>
                  <Button color="secondary" onClick={() => toggleMask(false)}>Cancel</Button>
              </div>
          </Box>
      </Box>
  </Backdrop>);
};

export default Mask;