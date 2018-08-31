import React from 'react';
import { NavLink } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fingerprint from '@material-ui/icons/Fingerprint';
import PersonAdd from '@material-ui/icons/PersonAdd';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    list: {
        width: 250,
    },
    title: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing.unit / 2,
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    toolbar: {
        ...theme.mixins.toolbar,
        paddingLeft: theme.spacing.unit * 3,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    Link: {
        textDecoration: 'none'
    }
});

const drawer = (props) => {
    const { classes } = props;

    return (
        <Drawer open={props.open} onClose={props.toggleDrawer(false)}>
            <div className={classes.list}>
                <div className={classes.toolbar}>
                    <div className={classes.title}>
                        <Typography variant="title" color="inherit">
                            Chat
                        </Typography>
                    </div>
                </div>
                <Divider />
                <List>
                    <NavLink to="/auth" className={classes.Link}>
                        <ListItem button onClick={props.toggleDrawer(false)}>
                            <ListItemIcon>
                                <Fingerprint />
                            </ListItemIcon>
                            <ListItemText primary="Sign In" />
                        </ListItem>
                    </NavLink>

                    <NavLink to="/auth" className={classes.Link}>
                        <ListItem button onClick={props.toggleDrawer(false)}>
                            <ListItemIcon>
                                <PersonAdd />
                            </ListItemIcon>
                            <ListItemText primary="Sign Up" />
                        </ListItem>
                    </NavLink>
                </List>
            </div>
        </Drawer>
    );
}

export default withStyles(styles)(drawer);