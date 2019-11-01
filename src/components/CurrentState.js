import React from 'react'
import PropTypes from 'prop-types';
import {Button,Input} from 'svz-toolkit'

const CurrentState = props => {
	const {changeDisplay, displayName, pickActive, openGroup, type} = props
	return (
		<div>
			<h1>Watch Together</h1>
			<h2>{props.currentVideo}</h2>
			<p>{props.videoData}</p>
			{
				props.type === 'admin' || props.type === 'owner' || props.openGroup ? <Button onClick={pickActive('invite')}></Button> : null
			}
			{
				props.displayName
					? <><Button>Login</Button><Input submitFunction={changeDisplay} value={displayName || 'Guest'} /></>
					: <><h2>{displayName}</h2><Button>Logout</Button></>
			}
			{ props.invite ? <Button onClick={() => pickActive(5)}>Invite</Button> : null }	
		</div>
	)
}

CurrentState.propTypes = {

};

export {CurrentState};