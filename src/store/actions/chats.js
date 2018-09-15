import * as actionTypes from './actionTypes';

export const setSocket = socket => ({
    type: actionTypes.SET_SOCKET,
    payload: socket
});