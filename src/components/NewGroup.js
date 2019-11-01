import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {Button, Input, PopContent} from 'svz-toolkit'

const NewGroup = props => {
	const {displayName, onSubmit} = props;
	const [name, setName] = useState(props.name);
	const [invited, setInvited] = useState([]);
	const [open, setOpen] = useState(false);
    const [groupName, setGroupName] = useState('');
	const [privs, setPrivs] = useState({
	admin: {
        video: false,
        seek: true,
        play: true,
        pause: true,
        buffer: true,
        approve: true,
        invite: true
    },
    owner: {
        video: true,
        seek: true,
        play: true,
        pause: true,
        buffer: true,
        approve: true,
        invite: true
    },
    member: {
        video: false,
        seek: false,
        play: true,
        pause: true,
        buffer: true,
        approve: false,
        invite: false
    },
    guests: {
        video: false,
        seek: false,
        play: true,
        pause: true,
        buffer: true,
        approve: false,
        invite: false
    }})
    const labels = {
    	video: 'Can select video',
        seek: 'Can change video time',
        play: 'Can resume playback',
        pause: 'Can pause playback',
        buffer: 'Stops playback while buffering',
        approve: 'Can approve non-privileged requests.',
        invite: 'Can invite new members.'
    }
    const Section = props => <PopContent label={props.label.charAt(0).toUpperCase() + props.label.substring(1)}>
    	{
    		Object.keys(privs[props.label]).map(section => <div>
	    		<h4>{labels[section]}</h4>
	    		<Input type="checkbox" value={privs[props.label][section]} onChange={val => setPriv(props.label, section, val)} />
	    	</div>)
	    }
    </PopContent>
    const setPriv = (category, privilege, setTo) => {
    	const newPrivs = privs;
    	newPrivs[category][privilege] = setTo;
    	setPrivs({...newPrivs});
    }
	return (
		<div>
			<Input value={groupName} onChange={newName => setGroupName({newName})} placeholder="Email" />
			<PopContent label="Settings">
				<h4>Owner: {props.displayName}</h4>
				<h4>Group Name:</h4><Input onChange={val => setOpen(name)} />
				<h4>Requires Approval to Join:</h4><Input type="checkbox" onChange={val => setOpen(val)} />
				<h4></h4>
				<PopContent label="Privileges" >
					{Object.keys(privs).map(category => <Section label={category} />)}
				</PopContent>
			</PopContent>
			<div>
				<Button onClick={() => onSubmit(name, privs, invited, open)}>Create Group</Button>
				<Button onClick={() => props.reset()}>Cancel</Button>
			</div>
		</div>
	)
}

NewGroup.propTypes = {

};

export {NewGroup};