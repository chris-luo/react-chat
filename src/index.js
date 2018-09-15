import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import chatsReducer from './store/reducers/chats';

const store = createStore(combineReducers({
    chats: chatsReducer
}));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter store={store}>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
