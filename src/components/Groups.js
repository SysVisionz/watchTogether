import React from 'react'
import PropTypes from 'prop-types';
import {PopContent, Button} from 'svz-toolkit';

const Groups = props => {
	const {groups, time, type} = props;
	return (
		<div>
			{groups[type] ? groups[type].map(item => {
				return <PopContent label={item.name}>
					<h3>{item.link}</h3><p>{time.toTimeString().substr(0,5) + ' ' + time.toLocaleDateString()}</p>
				</PopContent>
			}) : null}
		</div>
	)
}

Groups.propTypes = {

};

export {Groups};