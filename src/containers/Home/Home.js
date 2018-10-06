import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Face from '@material-ui/icons/Face';
import classes from './Home.css';
import format from 'date-fns/format';
import differenceInHours from 'date-fns/difference_in_hours';

import * as actions from '../../store/actions';

const transformDate = date => {
    const hours = differenceInHours(new Date(), date);
    if (hours < 12) {
        return format(date, 'h:mm A');
    }
    if (hours < 24) {
        return 'Yesterday';
    }
    if (hours < 72) {
        return format(date, 'dddd');
    }
    return format(date, 'M/D/YY');
}

class Home extends Component {
    state = {
        toChat: false,
        selectedChat: null
    }

    componentDidMount() {
        if (!this.props.socket) {
            this.props.onSetSocket(this.getSocket());
        }
        const token = localStorage.getItem('token');

        axios.get(`http://localhost:3000/users/${this.props.user.id}/chats`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                this.props.onSetChats(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    getSocket = () => {
        const socket = new WebSocket(`ws://localhost:3000/ws`);
        socket.addEventListener('open', event => {
            console.log(event);
            socket.send(JSON.stringify({
                type: 99,
                payload: localStorage.getItem('token')
            }));
        });
        socket.addEventListener('message', (event) => {
            const messages = event.data.split(/\n/);
            for (const message of messages) {
                this.props.onReceiveMessage(JSON.parse(message));
            }
        });
        socket.addEventListener('error', (event) => {
            console.log("error: ", event);
        });
        socket.addEventListener('close', (event) => {
            console.log(event);
            this.props.onSetSocket(null);
        });
        return socket;
    }

    onChat = chat => () => {
        this.setState({
            toChat: true,
            selectedChat: chat
        });
    }

    render() {
        if (this.state.toChat) {
            return <Redirect to={`/chats/${this.state.selectedChat.id}?msg=${this.state.selectedChat.messages[0].id}`} />
        }
        let chats = null;
        if (this.props.chats) {
            chats = (
                <List>
                    {
                        this.props.chats.map(chat => (
                            <ListItem
                                button
                                key={chat.id}
                                onClick={this.onChat(chat)}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Face />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={chat.users[1]}
                                    secondary={chat.messages[0].body} />
                                <ListItemText
                                    secondary={transformDate(chat.messages[0].sendTime)}
                                    className={classes.time} />
                            </ListItem>
                        ))
                    }
                </List>
            );
        }

        return (
            <div>
                <h1>Welcome Home</h1>
                {chats}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        socket: state.chats.socket,
        chats: state.chats.chats,
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetSocket: socket => dispatch(actions.setSocket(socket)),
        onReceiveMessage: message => dispatch(actions.receiveMessage(message)),
        onSetChats: chats => dispatch(actions.setChats(chats))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);