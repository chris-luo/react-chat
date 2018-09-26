import * as actionTypes from '../actions/actionTypes';
import * as webSocket from '../../webSocket/webSocket';

const initialState = {
    socket: null,
    chats: []
}

const reducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SEND_MESSAGE:
            state.socket.send(JSON.stringify({
                type: webSocket.SEND_MESSAGE,
                payload: JSON.stringify({
                    room: action.payload.id,
                    message: action.payload.message
                })
            }));
            return {
                ...state
            }
        case actionTypes.RECEIVE_MESSAGE:
            const index = state.chats.findIndex(chat => chat.id === action.payload.id);
            const chat = state.chats[index];
            const updatedChat = {
                ...chat,
                messages: [...chat.messages, action.payload.message]
            }
            const oldChats = [...state.chats];
            oldChats.splice(index, 1);
            const chats = [updatedChat, ...oldChats]
            return {
                ...state,
                chats: chats
            }
        case actionTypes.SET_SOCKET:
            return {
                ...state,
                socket: action.payload
            };
        case actionTypes.JOIN_ROOM:
            state.socket.send(JSON.stringify({
                type: webSocket.JOIN_ROOM,
                payload: action.payload
            }));
            return {
                ...state
            }
        case actionTypes.LEAVE_ROOM:
            state.socket.send(JSON.stringify({
                type: webSocket.LEAVE_ROOM,
                payload: action.payload
            }));
            return {
                ...state
            }
        case actionTypes.SET_CHAT:
            return {
                ...state,
                chats: [...state.chats, action.payload]
            }
        default:
            return state;
    }
}

export default reducer;