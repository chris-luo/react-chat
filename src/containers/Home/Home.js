import React, { Component } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Face from '@material-ui/icons/Face';
import classes from './Home.css';

class Home extends Component {
    state = {
        chats: null
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        console.log(token);
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
        console.log(chat);
    }

    render() {
        console.log(this.state.chats);
        let chats = null;
        if (this.state.chats) {
            chats = (
                <List>
                    {
                        this.state.chats.map(chat => (
                            <ListItem button key={chat.id} onClick={this.onChat(chat)}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Face />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={chat.users[1]} secondary={chat.messages[0].body} />
                                <ListItemText secondary={chat.messages[0].send_time} className={classes.time} />
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