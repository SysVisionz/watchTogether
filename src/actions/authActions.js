import {genSalt, hash} from 'bcryptjs';
import request from 'request-promise';

export const overwrite = (prop, value) => ({ type: 'overwrite', payload: {prop, value} })

export const update = prop => ({ type: 'insert', payload: prop })

const uri = location => 'localhost:8086/' + location;

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

const login = (res, socket) => {
	return dispatch => ({
		type: 'login',
		payload: {
			user: res.body,
			newUser: false,
			token: res.headers['x-auth']
		}
	})
	socket.emit('login', {token: res.headers['x-auth']});
}

export const signIn = (displayName, pass, persist, socket) => {
	const saltPass = genSalt(10, (err, salt) => {
		hash(pass, salt, (err, hash) => {
			pass = saltPass;
		}); 
	});
	return dispatch => {
		request({
			method: 'GET',
			uri: uri('users/login'),
			body: {
				displayName, pass, persist
			},
			json: true
		}).then (res => login(res, socket))
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

export const createUser = (displayName, pass, email, persist, socket) => {
	return dispatch => {
		request({
			method: 'POST',
			uri: uri('users'),
			body: {
				displayName, pass, email, persist, socket, token: getToken()
			},
			json: true
		}).then(res => login(res, socket)).catch(err => {
			dispatch({
				type: 'login fail',
				payload: {
					error: err.message
				}
			})
		})
	}
}

export const logout = () => {

}