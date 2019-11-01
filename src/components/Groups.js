import React from 'react'
import PropTypes from 'prop-types';
import {PopContent, Button} form 'svz-toolkit';

const Groups = props => {
	return (
		<div>
			{props.groups[props.type].map(item => {
				<PopContent label={item.name}>
					<h3>{item.link}</h3><p>{time.toTimeString().substr(0,5) + ' ' + time.toLocaleDateString()}</p>
				</PopContent>
			})}
		</div>
	)
}

Groups.propTypes = {

};

export {Groups};