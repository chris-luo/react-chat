import * as actionTypes from '../actions/actionTypes';

const initialState = {
    socket: null
}

const reducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SEND_MESSAGE:
            state.socket.send(JSON.stringify({
                type: 2,
                payload: JSON.stringify({
                    room: action.payload.id,
                    message: action.payload.message
                })
            }));
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
                type: 1,
                payload: action.payload
            }));
            return {
                ...state
            }
        case actionTypes.LEAVE_ROOM:
            state.socket.send(JSON.stringify({
                type: 0,
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