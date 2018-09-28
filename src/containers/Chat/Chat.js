import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import * as actions from '../../store/actions';

class Chat extends Component {
    state = {
        message: '',
        redirect: false,
        id: null
    }

    componentDidMount() {
        if (!this.props.socket) {
            this.setState({
                redirect: true
            });
            return;
        }

        const { id } = this.props.match.params;
        this.props.onJoinRoom(id);

        this.setState({
            id: id
        });

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
                this.props.onSetMessages(this.state.id, res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
        if (this.state.id) {
            this.props.onLeaveRoom(this.state.id);
        }
    }

    handleChange = key => event => {
        this.setState({
            [key]: event.target.value,
        });
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onSendMessage(this.state.id, this.state.message);
        this.setState({
            message: ''
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={''} />
        }

        let messages = null;

        const chat = this.props.chats.find(chat => chat.id === this.state.id);
        if (chat) {
            messages = (
                <List>
                    {
                        chat.messages.map(message => (
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
                {messages}
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
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        socket: state.chats.socket,
        chats: state.chats.chats
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onJoinRoom: room => dispatch(actions.joinRoom(room)),
        onLeaveRoom: room => dispatch(actions.leaveRoom(room)),
        onSendMessage: (room, message) => dispatch(actions.sendMessage(room, message)),
        onSetMessages: (id, messages) => dispatch(actions.setMessages(id, messages))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);