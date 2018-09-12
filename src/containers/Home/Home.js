import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
        chats: null,
        chat: null,
        socket: null,
        toChat: false,
        selectedChat: null
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/users/1/chats', {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                this.setState({
                    chats: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    onChat = chat => () => {
        this.setState({
            toChat: true,
            selectedChat: chat
        });
        console.log(chat);
    }

    render() {
        if (this.state.toChat) {
            return <Redirect to={`/chats/${this.state.selectedChat.id}?msg=${this.state.selectedChat.messages[0].id}`} />
        }
        let chats = null;
        if (this.state.chats) {
            chats = (
                <List>
                    {
                        this.state.chats.map(chat => (
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
                                    secondary={transformDate(chat.messages[0].send_time)}
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

export default Home;