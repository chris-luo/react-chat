import * as actionTypes from '../actions/actionTypes';
import * as webSocket from '../../webSocket/webSocket';

const initialState = {
    socket: null
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
            console.log(action.payload);
            return {
                ...state
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
        default:
            return state;
    }
}

export default reducer;