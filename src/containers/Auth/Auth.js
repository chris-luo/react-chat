import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Snackbar from '@material-ui/core/Snackbar';
import { CardHeader } from '@material-ui/core';

import jwt_decode from 'jwt-decode';
import * as actions from '../../store/actions';

class Auth extends Component {
    state = {
        email: '',
        password: ''
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.email, this.state.password);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        let redirect = null;
        if (this.props.isAuthenticated) {
            redirect = <Redirect to="" />
        }

        return (
            <div>
                {redirect}
                <Card className={classes.card}>
                    <CardHeader title="Sign In" />
                    <CardContent>
                        <form onSubmit={this.submitHandler}>
                            <TextField
                                label="email"
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                fullWidth
                                margin="normal" />
                            <TextField
                                type="password"
                                label="password"
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                fullWidth
                                margin="normal" />
                            <Button type="submit" color="primary">
                                Sign in
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.props.error ? true : false}
                    onClose={this.props.onAuthReset}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    autoHideDuration={3000}
                    message={<span id="message-id">{this.props.error}</span>}
                />
            </div>
        )
    }
}

const styles = theme => ({
    card: {
        width: '100%',
        margin: 'auto',
        [theme.breakpoints.up('sm')]: {
            width: '75%'
        },
        [theme.breakpoints.up('md')]: {
            width: '50%'
        },
    }
});

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
    onAuthReset: () => dispatch(actions.authReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Auth));