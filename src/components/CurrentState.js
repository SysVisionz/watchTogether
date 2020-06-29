import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {Button,Input, PopContent, LoginBox, filterJoin} from 'svz-toolkit'
import {Chatbox} from './Chatbox';

const CurrentState = props => {
	const {changeDisplay, displayName, pickActive, group, type, update, waiting, tempName, login, chat, sessionChat, sendChat, chatRef} = props
	const [loggingIn, setLoggingIn] = useState(false)
	const [error, setError] = useState('');
	const [timer, setTimer] = useState(null);
	const [errActive, setErrActive] = useState(false);
	const [persist, setPersist] = useState(true);
	const [user, setUser] = useState('');
	const [pass, setPass] = useState('');
	if (error !== props.error){
		setError(props.error)
		setErrActive(true);
		if (timer){
			clearTimeout(timer)
		}
		setTimer(setTimeout(() => {
			setErrActive(false)
			setTimer(setTimeout(() => {
				setError('');
				setTimer(null);
			}, 400))
		},6000))
	}
	if (loggingIn && (error || displayName)){

	}
	return (
		<div>
			<h2>{props.currentVideo}</h2>
			<p>{props.videoData}</p>
			<Chatbox chat={chat} sessionChat={sessionChat} sendChat={sendChat} ref={chatRef} />
			{
				!group || group.privs.includes('invite') ? <Button onClick={() => pickActive(4)}>Invite</Button> : null
			}
			{
				!displayName
					? <>
						<Input onSubmit={tempName => update({user: {tempName}})} value={displayName || tempName || 'Guest'} />
						<PopContent label={Login}>
							<div className={filterJoin([['logging-in', loggingIn]])}>
								<Input label = "Email" className="user-box" autoComplete="username" onChange={val => setUser(val)} value={user} />
								<Input type="password" placeholder="password" className="password-box" autoComplete="current-password" onChange = {val => setPass(val)} value={pass} />
								<div className = "persist-box">
									<p>Stay logged in?</p>
									<Input type="checkbox" checked = {persist} onChange={val => setPersist(val)} />
								</div>
								<div className = "login-box">
									<Button onClick={() => {
										setLoggingIn(true)
										login(user, pass, persist)
									}}>Sign In</Button>
									<div className = "logging-in-content">{waiting}</div>
								</div>
							</div>
						</PopContent></>
					: <>
						<h2>{displayName}</h2>
						<Button>Logout</Button>
					</>
			}
			<div className={filterJoin(['error-box', ['active', errActive]])} >{error}</div>
		</div>
	)
}

CurrentState.propTypes = {

};

export {CurrentState};