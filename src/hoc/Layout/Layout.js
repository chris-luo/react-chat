import React, { Component, Fragment } from "react";

import AppBar from '../../components/Navigation/AppBar/AppBar';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import classes from './Layout.css';

class Layout extends Component {
    state = {
        open: false
    }

    toggleDrawer = open => () => {
        this.setState({
            open: open,
        });
    }

    render() {
        return (
            <Fragment>
                <AppBar toggleDrawer={this.toggleDrawer} />
                <Drawer
                    open={this.state.open}
                    toggleDrawer={this.toggleDrawer}
                    listItemHandler={this.listItemHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default Layout;