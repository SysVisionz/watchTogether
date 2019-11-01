import {genSalt, hash} from 'bcryptjs';
import request from 'request-promise';

export const overwrite = (prop, value) => ({ type: 'overwrite', payload: {prop, value} })

export const insert = prop => ({ type: 'insert', payload: prop })

const uri = location => 'localhost:8086/' + location;

const getToken = () => localStorage.getItem('svz-watch-together-user-token')

export const getGroups = () => {
	const token = getToken();
	return dispatch => {
		request({
			method: 'GET',
			uri: uri('group/get'),
			headers: {
				'x-auth': token
			},
			json: true
		}).then (res => {
			dispatch({
				type: 'insert',
				payload: {
					group: {

					}
				}
			})
		})
		.catch(err => {
            dispatch({
                type: 'login fail',
                payload: {
                    group: err.statusCode === 400 ? err.message : false,
                    error: err.message,
                }
            });
        });
	}
}

export const exitGroup = socket => {
	socket.emit('exitGroup', {token});
}