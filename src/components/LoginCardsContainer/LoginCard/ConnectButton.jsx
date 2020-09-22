// External dependencies
import React from 'react';
import {Button, Menu, MenuItem} from '@material-ui/core';

const ConnectButton = ({ ceKeys, checkConnection, connected, deleteConnection, instance, oauthRedirectSend, setAlert, toggleDrawer, updateConnection, vendorData }) => {
    const [menuAnchor, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (connected) {
        return (
            <React.Fragment>
                <Button
                    variant="outlined"
                    onClick={handleClick}
                >
                    Manage
                </Button>
                {instance && <Menu
                    id="simple-menu"
                    anchorEl={menuAnchor}
                    keepMounted
                    open={Boolean(menuAnchor)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => {
                        toggleDrawer(instance.element.key);
                        handleClose();
                    }}>
                        See details
                    </MenuItem>
                    <MenuItem onClick={() => {
                        checkConnection(ceKeys, instance);
                        handleClose();
                    }}>
                        Check connection
                    </MenuItem>
                    <MenuItem onClick={() => {
                        updateConnection(ceKeys, vendorData, instance.id);
                        handleClose();
                    }}>
                        Update connection
                    </MenuItem>
                    <MenuItem onClick={() => {
                        deleteConnection(ceKeys, instance);
                        handleClose();
                    }}>
                        Delete connection
                    </MenuItem>
                </Menu>}
            </React.Fragment>
        )
    } else {
        return (
            <Button
                variant="outlined"
                onClick={() => oauthRedirectSend(ceKeys, vendorData)}
            >
                Connect
            </Button>
        )
    }
}

export default ConnectButton;



