import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Chat extends Component {
    state = {
        message: '',
        chat: null,
        redirect: false
    }

    componentDidMount() {
        if (!this.props.socket) {
            this.setState({
                redirect: true
            });
            return;
        }
        const { id } = this.props.match.params;

        this.props.socket.send(JSON.stringify({
            type: 1,
            payload: id + ""
        }));
        const token = localStorage.getItem('token');

        axios.get(`http://localhost:3000/users/1/chats/${id}/messages`, {
            headers: {
                authorization: `Bearer ${token}`
            },
            params: {
                message_id: this.props.location.search.split('?')[1].split('msg=')[1]
            }
        })
            .then(res => {
                console.log(res.data);
                this.setState({
                    chat: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    handleChange = key => event => {
        this.setState({
            [key]: event.target.value,
        });
    }

    submitHandler = event => {
        event.preventDefault();
        const { id } = this.props.match.params;
        this.props.socket.send(JSON.stringify({
            type: 2,
            payload: JSON.stringify({
                room: id,
                message: this.state.message
            })
        }));
        this.setState({
            message: ''
        });
    }

    onClickHandler = () => {
        this.props.socket.send(JSON.stringify({
            type: 1,
            payload: 10 + ""
        }));
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={''} />
        }

        let chat = null;
        if (this.state.chat) {
            chat = (
                <List>
                    {
                        this.state.chat.map(message => (
                            <ListItem key={message.id}>
                                <ListItemText primary={message.body} />
                            </ListItem>
                        ))
                    }
                </List>
            );
        }
        return (
            <div>
                {chat}
                <form onSubmit={this.submitHandler}>
                    <TextField
                        value={this.state.message}
                        onChange={this.handleChange('message')}
                        fullWidth
                        margin="normal" />
                    <Button type="submit" color="primary">
                        Send
                    </Button>
                </form>
                <Button type="button" color="primary" onClick={this.onClickHandler}>
                    Change
                    </Button>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        socket: state.chats.socket
    }
}

export default connect(mapStateToProps)(Chat);