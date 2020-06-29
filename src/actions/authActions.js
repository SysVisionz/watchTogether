import {genSalt, hash} from 'bcryptjs';

import request from 'request-promise';
require('dotenv').config() 

export const overwrite = (prop, value) => ({ type: 'overwrite', payload: {prop, value} })

export const update = prop => ({ type: 'insert', payload: prop })

const uri = location => process.env.HOST + location;

const getToken = () => localStorage.getItem('svz-watch-together-user-token')

export const loadData = () => {
	const token = getToken();
	return dispatch => {
		request({
			method: 'GET',
			uri: uri('data'),
			headers: {
				'x-auth': token
			}
		})
	}
}

const login = (res) => {
	return dispatch => ({
		type: 'login',
		payload: {
			user: res.body,
			newUser: false,
			token: res.headers['x-auth']
		}
	})
}

export const signIn = (displayName, pass, persist) => {
	return dispatch => {
		request({
			method: 'GET',
			uri: uri('users/login'),
			body: {
				displayName, pass, persist
			},
			json: true
		}).then (res => login(res))
		.catch(err => {
            dispatch({
                type: 'login fail',
                payload: {
                    newUser: err.statusCode === 400 ? err.message : false,
                    error: err.message,
                }
            });
        });
	}
}

export const createUser = (displayName, pass, email, persist) => {
	return dispatch => {
		request({
			method: 'POST',
			uri: uri('users'),
			body: {
				displayName, pass, email, persist, token: getToken()
			},
			json: true
		}).then(res => login(res)).catch(err => {
			dispatch({
				type: 'login fail',
				payload: {
					error: err.message
				}
			})
		})
	}
}

export const openSocket = socket => {
	const token = getToken();
	return dispatch => {
		socket.emit('signIn', )
	}
}

export const logout = () => {

}