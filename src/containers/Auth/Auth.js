import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Auth extends Component {
    state = {
        email: '',
        password: ''
    }

    submitHandler = event => {
        event.preventDefault();
        console.log(this.state);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
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
        )
    }
}

const styles = theme => ({
    card: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '50%',
        },
    }
});

export default withStyles(styles)(Auth);