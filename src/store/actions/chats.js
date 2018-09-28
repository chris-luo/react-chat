import * as actionTypes from './actionTypes';

export const setSocket = socket => ({
    type: actionTypes.SET_SOCKET,
    payload: socket
});

export const joinRoom = room => ({
    type: actionTypes.JOIN_ROOM,
    payload: room
});

export const leaveRoom = room => ({
    type: actionTypes.LEAVE_ROOM,
    payload: room
});

export const sendMessage = (id, message) => ({
    type: actionTypes.SEND_MESSAGE,
    payload: {
        id: id,
        message: message
    }
});

export const receiveMessage = message => ({
    type: actionTypes.RECEIVE_MESSAGE,
    payload: message
});

export const setChats = chats => ({
    type: actionTypes.SET_CHATS,
    payload: chats
});

export const setMessages = (id, messages) => ({
    type: actionTypes.SET_MESSAGES,
    payload: {
        id: id,
        messages: messages
    }
});