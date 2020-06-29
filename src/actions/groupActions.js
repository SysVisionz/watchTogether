import {genSalt, hash} from 'bcryptjs';
import request from 'request-promise';
require('dotenv').config() 

const uri = location => process.env.HOST + location;

const getToken = () => localStorage.getItem('svz-watch-together-user-token')

export const getGroups = () => {
	return dispatch => {
		request({
			method: 'GET',
			uri: uri('group/get'),
			headers: {
				'x-auth': getToken()
			},
			json: true
		}).then (res => {
			dispatch({
				type: 'insert',
				payload: {
					groups: []
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

export const getGroup = _id => {
	return dispatch => {
		request({
			method: 'GET',
			uri: uri('group/getOne'),
			headers: {
				'x-auth': getToken(),
				_id
			},
			json: true
		}).then (res => {
			dispatch({
				type: 'group',
				payload: {
					_id: res._id,
					name: res.name,
					chat: {
						members: res.chat.members,
						messages: res.chat.messages,
					}

				}
			})
		})
	}
}

export const getOlderChat = (groupId, index) => {
	return dispatch => {
		request({
			method: 'GET',
			uri: uri('group/getOlder'),
			headers: {
				'x-auth': getToken(),
				current: index
			},
			json: true
		}).then (res => {
			dispatch({
				type: 'oldChat',
				chat: {
					messages: res
				}
			})
		})
	};
}

export const getYoungerChat = (groupId, index) => {
	return dispatch => {
		request({
			method: 'GET',
			uri: uri('group/getYounger'),
			headers: {
				'x-auth': getToken(),
				current: index
			},
			json: true
		}).then (res => {
			dispatch({
				type: 'youngChat',
				chat: {
					messages: res
				}
			})
		})
	}
}

export const newGroup = (name, privs, invited, open) => {
	return dispatch => {
		request({
			method: 'GET',
			uri: uri('group/new'),
			headers: {
				'x-auth': getToken(),
			},
			body: {
				name,
				privs,
				invited,
				open
			},
			json: true
		}).then (res => {
			dispatch({
				type: 'newGroupSuccess',
				payload: {
					_id: res._id,
					name: res.name,
				}
			})
		})
	}
}

export const exitGroup = socket => {
	socket.emit('exitGroup', {token: getToken()});
}