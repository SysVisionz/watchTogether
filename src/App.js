import React, {Component} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {filterJoin, Button, TimeMan} from 'svz-toolkit'
import './App.scss';
import {NewUser, CurrentState, Groups, ProfilePanel, NewGroup, History, LoginPanel, InvitePanel, ApprovePanel} from './components'
import {signIn, logout, update, overwrite, createUser, newGroup, sendChat} from './actions';

const mapStateToProps = state => {
	const {
		groups,
		video,
		time
	} = state.group
	const {
		persist,
		newUser
	} = state.auth
	const {
		displayName,
		friends,
		type,
		pass,
		name,
		chat
	} = state.user
	const {
		sessionGroup,
		sessionId,
		privileges
	} = state.session
	return {
		chat,
		video,
		displayName,
		pass,
		newUser,
		friends,
		groups,
		displayName,
		name,
		persist,
		newUser,
		sessionChat: state.session.chat,
		currentGroup: state.group.current,
		groupError: state.group.error,
		authError: state.auth.error,
		sessionError: state.session.error,
		userError: state.user.error,
		history: state.group.history || state.session.history
	}
}

class App extends Component {
	
	constructor() {
		super()
		this.state={active:0, hidden: false, chatPosition: 'bottom'}
		this.timeManager = new TimeMan()
		this.chatRef = React.createRef()
	}

	checkBottom = evt => {
		const chatBox = evt.target;
		const {update} = this.props;
		if (chatBox.scrollTop === 0){
			this.setState({chatPosition: 'top' })
		}
		else if (chatBox.scrollTop-chatBox.scrollHeight+chatBox.clientHeight === 0){
			this.setState({chatPosition: 'bottom' })
		}
		else if ( this.state.chatPosition !== 'scrolling' ) {
			this.setState({chatPosition: 'scrolling' })
		}
	}

	handleSeek = seek => {
		const {chrome} = window;
		this.setState({active: 'current'})
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {type: "seek", seek}, function(response){
				console.log(response);
			})
		})
	}

	componentDidUpdate(){
		if (!this.state.ready && this.chatRef.current){
			this.chatRef.current.addEventListener('scroll', this.checkBottom)
			this.setState({ready: true})
		}
	}

	pickActive = active => active ? this.setState({active}) : 0 ;


	render() {
		const {
			signIn, 
			friendsList, 
			user, 
			pass, 
			video, 
			time, 
			groups, 
			displayName, 
			inviteUser, 
			approveSeek, 
			email, 
			userError, 
			history, 
			update, 
			persist, 
			newUser,
			name,
			currentGroup,
			chat,
			sessionChat,
			newGroup,
		} = this.props
		const {active, hidden, approving} = this.state
		const {pickActive, seek, sendApprove, sendChat} = this;
		const contents = [
			<CurrentState 
				chatRef = {this.chat} 
				chat={chat} 
				sessionChat={sessionChat} 
				friends={friendsList || []} 
				group={currentGroup} 
				name={name} 
				pickActive={pickActive} 
				pass={pass}
				displayName={displayName}
				login = {(persist) => signIn(displayName, pass, persist)} 
				update={update} 
				sendChat = {sendChat}
			/>,
			<NewUser 
				userError = {userError}
				approve={email => createUser(displayName, pass, email, persist)}
				editEmail={ (email) => update({user: {email}})}
				displayName={displayName}
				email={email}
				reset={pickActive}
			/>,
			<Groups 
				pickActive = {pickActive} 
				groups={groups} 
			/>,
			<ProfilePanel 
				displayName={displayName} 
				name={name} 
			/>,
			<InvitePanel
				invite={inviteUser}
				friends={friendsList}
			/>,
			<ApprovePanel
				action={approving}
				approve={() => sendApprove(true)}
				reject={() => sendApprove(false)} 
				reset={pickActive} 
			/>,
			<History 
				history={history} 
			/>,
			<NewGroup 
				onSubmit={newGroup}
				error={userError}
				rest={pickActive}
			/>
		]
		return (
			<div id={filterJoin(["popup-container", [hidden, 'hidden']])}>
			<h1>Watch Together</h1>
				{displayName 
					? <div>
						<Button onClick={() => pickActive()}>Session</Button>
						<Button onClick={() => pickActive(3)}>Group</Button>
						<Button>History</Button>
						<Button>Settings</Button>
					</div>
					: null
				}
				<div>{
					contents.map((content, index) => {
						const position = active < index ? 'right' : active > index ? 'left' : 'active'
						return (
							<div 
								key={'svz-tab-' + index}
								className={'tab ' + position} 
							>
								{content}
							</div>
						)
					})
				}</div>
			</div>
		)
	}
}

App.propTypes = {
	sendChat: PropTypes.func,
	signIn: PropTypes.func, 
	logout: PropTypes.func, 
	update: PropTypes.func, 
	overwrite: PropTypes.func, 
	createUser: PropTypes.func,
	user: PropTypes.string,
	pass: PropTypes.string,
	loginError: PropTypes.string,
	newUser: PropTypes.bool,
	groups: PropTypes.array,
	current: PropTypes.string,
	video: PropTypes.string,
	time: PropTypes.number,
	displayName: PropTypes.string,
	friends: PropTypes.array,
	type: PropTypes.string
}

export default connect (mapStateToProps, {signIn, logout, update, overwrite, createUser, newGroup, sendChat}) (App);
