import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import { CardHeader } from '@material-ui/core';

class Auth extends Component {
    state = {
        email: '',
        password: '',
        error: false,
        errorMessage: null,
    }

    submitHandler = event => {
        event.preventDefault();
        console.log(this.state);
        const authData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:3000/users/signin', authData)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.token);
            })
            .catch(error => {
                console.log(error.response);
                this.setState({
                    error: true,
                    errorMessage: error.response.data
                });
            });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClose = () => {
        this.setState({
            error: false,
            errorMessage: null
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
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
                    open={this.state.error}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    autoHideDuration={3000}
                    message={<span id="message-id">{this.state.errorMessage}</span>}
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

export default withStyles(styles)(Auth);