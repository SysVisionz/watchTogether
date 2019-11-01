import React from 'react'
import PropTypes from 'prop-types';
import {Button} from 'svz-toolkit'

const ProfilePanel = props => {
	let content = props.action.displayName + ' would like to ';
	let isError = false;
	switch(props.action.type){
		case 'video':
			content += 'watch ' + props.action.link + '.'
			break;
		case 'seek':
			content += 'skip to ' + props.action.time + '.'
			break;
		case 'pause':
			content += 'pause playback.';
			break;
		case 'play':
			content += 'resume playback.';
			break;
		case 'kick':
			content += 'kick ' + props.action.target;
			break;
		case 'invite':
			content += props.action.target ? 'invite ' + props.action.target : 'create an invite link.';
			break;
		default:
			content = "An error has occurred in a party member's request."
			isError = true;
	}
	return (
		<div>
			<h2>{content}</h2>
			{!isError 
				? <div>
					<Button onClick={() => props.approve()} >Approve</Button>
					<Button onClick={() => props.reject()}>Deny</Button>
				</div>
				: <Button onClick={() => props.reset()}>Return to Main Panel</Button>
			}
		</div>
	)
}

ProfilePanel.propTypes = {

};

export {ProfilePanel};