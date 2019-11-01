import { combineReducers } from 'redux';
import groupReducer from './groupReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';
import sessionReducer from './sessionReducer'

export default combineReducers({
    group: groupReducer,
    user: userReducer,
    auth: authReducer,
    session: sessionReducer
});
