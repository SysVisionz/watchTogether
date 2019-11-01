import {genSalt, hash} from 'bcryptjs';
import request from 'request-promise';

export const overwrite = (prop, value) => ({ type: 'overwrite', payload: {prop, value} })

export const insert = prop => ({ type: 'insert', payload: prop })

const uri = location => 'localhost:8086/' + location;

const getToken = () => localStorage.getItem('svz-watch-together-user-token')

export const createSession = (socket, video, host) => {
	socket.emit('createSession', {token: getToken()})
}

export const exitSession = socket => {
	socket.emit('exitSession', {token: getToken()})
}

export const leaveGroup = socket => {
	socket.emit('exitGroup', {token: getToken()})
}