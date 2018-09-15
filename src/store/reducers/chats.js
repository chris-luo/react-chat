import * as actionTypes from '../actions/actionTypes';

const initialState = {
    socket: null
}

const reducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_SOCKET:
            return {
                ...state,
                socket: action.payload
            };
        default:
            return state;
    }
}

export default reducer;