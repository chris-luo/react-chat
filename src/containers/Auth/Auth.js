import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
    card: {
        width: '50%'
    }
}

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
        console.log(this.props);
        const { classes } = this.props;
        console.log(classes);
        return (
            <Card className={classes.card}>
                <CardContent>
                    <form onSubmit={this.submitHandler}>
                        <TextField
                            placeholder="email"
                            value={this.state.email}
                            onChange={this.handleChange('email')} />
                        <TextField
                            type="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handleChange('password')} />
                        <Button type="submit" color="primary">
                            Sign in
                        </Button>
                    </form>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Auth);