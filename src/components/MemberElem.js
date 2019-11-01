import React from 'react'
import PropTypes from 'prop-types';
import {Button} from 'svz-toolkit';

const MemberElem = props => {
	let kickType;
	switch(props.canKick){
		case 'kick':
			kickType = 'Kick';
			break;
		case 'can':
			kickType = 'Vote to Kick';
			break;
		default:
			kickType = false;
	}
	return (
		<div className="member-element">
			<p>{props.displayName}</p>{kickType ? <Button>{kickType}</Button> : null}
		</div>
	)
}

MemberElem.propTypes = {

};

export {MemberElem};