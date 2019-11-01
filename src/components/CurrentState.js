import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {Button,Input, PopContent, LoginBox} from 'svz-toolkit'

const CurrentState = props => {
	const {changeDisplay, displayName, pickActive, group, type, update, error} = props
	const [loggingIn setLoggingIn] = useState(false)
	return (
		<div>
			<h1>Watch Together</h1>
			<h2>{props.currentVideo}</h2>
			<p>{props.videoData}</p>
			{
				!group || group.privs.includes('invite') ? <Button onClick={() => pickActive(4)}>Invite</Button> : null
			}
			{
				!props.displayName
					? <>
						<Input onSubmit={displayName => update({user: {displayName}})} value={displayName || 'Guest'} />
						<PopContent label={<Button>Login</Button>}>
							<div className={filterJoin([['logging-in', loggingIn]])}>
								<Input label = "Email" className="user-box" autoComplete="username" onChange={email => onChange({email})} value={email} />
								<Input type="password" label = "Password" className="password-box" autoComplete="current-password" onChange = {pass => onChange({pass})} value={pass} />
								<div className = "persist-box">
									<p>Stay logged in?</p>
									<input type="checkbox" checked = {persist} onChange={evt => onChange({persist: evt.target.checked})} />
								</div>
								<div className = "login-box">
									<input className="button thin" type="submit" value="Login" />
									<div className = "logging-in-content">{loggingInContent}</div>
								</div>
								<div className={filterJoin(['error-box', ['active', errorActive]])}>{error}</div>
							</div>
						</PopContent></>
					: <><h2>{displayName}</h2><Button>Logout</Button></>
			}
		</div>
	)
}

CurrentState.propTypes = {

};

export {CurrentState};