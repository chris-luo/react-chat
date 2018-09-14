import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Chat extends Component {
    state = {
        message: '',
        socket: null,
        chat: null
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const token = localStorage.getItem('token');

        if (!this.state.socket) {
            const socket = this.getSocket();
            socket.addEventListener('open', (event) => {
                socket.send(JSON.stringify({
                    type: 1,
                    payload: id + ""
                }));
            });
            this.setState({
                socket: socket
            });
        } else {
            this.state.socket.send(JSON.stringify({
                type: 1,
                payload: id + ""
            }));
        }

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

    getSocket = () => {
        const socket = new WebSocket(`ws://localhost:3000/ws`);
        socket.addEventListener('message', (event) => {
            console.log(JSON.parse(event.data));
            this.setState((state, props) => {
                return {
                    chat: [...state.chat, JSON.parse(event.data)]
                }
            });
        });
        socket.addEventListener('error', (event) => {
            console.log("error: ", event);
        });
        socket.addEventListener('close', (event) => {
            console.log(event);
            this.setState({
                socket: null
            });
        });
        return socket;
    }


    handleChange = key => event => {
        this.setState({
            [key]: event.target.value,
        });
    }

    submitHandler = event => {
        event.preventDefault();
        const { id } = this.props.match.params;
        console.log(this.state);
        this.state.socket.send(JSON.stringify({
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
        this.state.socket.send(JSON.stringify({
            type: 1,
            payload: 10 + ""
        }));
    }

    render() {

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

export default Chat;