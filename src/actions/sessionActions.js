import {genSalt, hash} from 'bcryptjs';
import request from 'request-promise';
require('dotenv').config() 

const uri = location => process.env.HOST + location;

const getToken = () => localStorage.getItem('svz-watch-together-user-token')

export const createSession = (socket, video, host) => {
	socket.emit('createSession', {token: getToken()})
}

export const exitSession = socket => {
	socket.emit('exitSession', {token: getToken()})
}

export const sendChat = (socket, content) => {
	socket.emit('sendChat', {token: getToken(), content})
}