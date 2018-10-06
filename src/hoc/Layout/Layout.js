import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import AppBar from '../../components/Navigation/AppBar/AppBar';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import classes from './Layout.css';

import * as actions from '../../store/actions';

class Layout extends Component {
    state = {
        open: false
    }

    toggleDrawer = open => () => {
        this.setState({
            open: open,
        });
    }

    signOutHandler = () => {
        this.props.onSignOut();
        this.setState({
            open: false,
        });
    }

    render() {
        return (
            <Fragment>
                <AppBar toggleDrawer={this.toggleDrawer} />
                <Drawer
                    open={this.state.open}
                    toggleDrawer={this.toggleDrawer}
                    listItemHandler={this.listItemHandler}
                    signOutHandler={this.signOutHandler}
                    isAuthenticated={this.props.isAuthenticated} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSignOut: () => dispatch(actions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);