import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

const appBar = (props) => (
    <AppBar position="static">
        <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={props.toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
                Chat
            </Typography>
        </Toolbar>
    </AppBar>
)

export default appBar;