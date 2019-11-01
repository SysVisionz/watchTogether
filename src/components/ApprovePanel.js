import React from 'react'
import PropTypes from 'prop-types';
import {Button} from 'svz-toolkit'

const ApprovePanel = props => {
	const {action = {}} = props;
	let content = (action ? action.displayName : 'A guest') + ' would like to ';
	let isError = false;
	switch(action.type){
		case 'video':
			content += 'watch ' + action.link + '.'
			break;
		case 'seek':
			content += 'skip to ' + action.time + '.'
			break;
		case 'pause':
			content += 'pause playback.';
			break;
		case 'play':
			content += 'resume playback.';
			break;
		case 'kick':
			content += 'kick ' + action.target;
			break;
		case 'invite':
			content += action.target ? 'invite ' + action.target : 'create an invite link.';
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

ApprovePanel.propTypes = {

};

export {ApprovePanel};