import { combineReducers } from 'redux';
import groupReducer from './groupReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';

export default combineReducers({
    group: groupReducer,
    user: userReducer,
    auth: authReducer
});
