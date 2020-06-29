import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {Button, Input} from 'svz-toolkit'
import {ChatElement} from './ChatElement';

const Chatbox = props => {
	const {chat, sendChat, ref, chats} = props;
	const [selected, setSelected] = useState('Session');
	return (
		<div className="chat-container">
			<div className="chat-content" ref={ref}>
				<ChatElement chat={chat} chats={chats} /> 
			</div>
			<div className="chat-entry">
				<Input onSubmit={(val) => sendChat(val)} clear editButton="Send" active />
			</div>
		</div>
	)
}

Chatbox.propTypes = {

};

export {Chatbox};