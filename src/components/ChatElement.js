import React from 'react'
import PropTypes from 'prop-types';
import {filterJoin} from 'svz-toolkit';

const ChatElement = props => {
	const {chat, chats, loading, onSelect} = props;
	return (
		<div className="container">
			<div className={filterJoin(["messages", ["loading", !chat]])}>
				{chat 
					? chat.map(message => <div className="message">
						<div className="sender">
							<span className="user-title">{message.username || message.groupName}</span>
							<span className="user-name">{message.groupName && message.username ? " (" + message.groupName + ")" : null}</span>
						</div>
						<div className="content">{message.message}</div>
					</div>) 
					: loading
				}
			</div>
			<div className="tabs">
				{
					chats 
					? <div>
						<div className="chat-tab" onClick={() => this.props.onSelect(null)}>
						{
							Object.keys(chats).map(id => {
								const {name, messages} = chats[id]
								return <div onClick={() => onSelect(id)}>
									<span className="tag-title" >{name}</span>
									<div className="new-indicator">{messages}</div>
								</div>
							})
						}
						</div>
					</div>
					: null
				}
			</div>
		</div>
	)
}

ChatElement.propTypes = {
	chats: PropTypes.object,
	chat: PropTypes.array
};

export {ChatElement}