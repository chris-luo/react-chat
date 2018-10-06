import * as actionTypes from './actionTypes';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (token, user) => ({
    type: actionTypes.AUTH_SUCCESS,
    payload: {
        token: token,
        user: user
    }
});

export const authFail = error => ({
    type: actionTypes.AUTH_FAIL,
    payload: error
});

export const authReset = () => ({
    type: actionTypes.AUTH_RESET
});

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password
        };

        axios.post('http://localhost:3000/users/signin', authData)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.token);
                const decodedToken = jwt_decode(res.data.token);
                dispatch(authSuccess(res.data.token, decodedToken))
            })
            .catch(error => {
                console.log(error.response);
                dispatch(authFail(error.response.data))
            });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const decodedToken = jwt_decode(token);
            const now = new Date().getTime() / 1000;
            if (now < decodedToken.exp) {
                dispatch(authSuccess(token, decodedToken));
            } else {
                dispatch(logout());
            }
        }
    }
}