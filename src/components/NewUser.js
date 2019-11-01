import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {Button, Input} from 'svz-toolkit'

const NewUser = props => {
	const {displayName, update, newUser, reset} = props;
	const [email, setEmail] = useState('');
	return (
		<div>
			<h2>Please input your email to make an account with username {displayName}.</h2>
			<Input value={email} onChange={newEmail => setEmail(newEmail)} placeholder="Email" />
			<div><Button onClick={() => newUser(email)} >Register</Button><Button onClick={() => reset()}>Cancel</Button></div>
		</div>
	)
}

NewUser.propTypes = {

};

export {NewUser};