import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    user: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                error: null
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case actionTypes.AUTH_RESET:
            return {
                ...state,
                error: null
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                user: null
            }
        default:
            return state;
    }
}

export default reducer;