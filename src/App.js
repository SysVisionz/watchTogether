import React, {Component} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';
import {filterJoin, Button, TimeMan} from 'svz-toolkit'
import './App.scss';
import {NewUser, CurrentState, Groups, ProfilePanel, NewGroup, History, LoginPanel} from './components'
import {signIn, logout, update, overwrite, createUser} from './actions';

const mapStateToProps = state => {
	const {
		groups,
		current,
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
		pass
	} = state.user
	const {
		sessionGroup,
		sessionId,
		privileges
	} = state.session
	return {
		video,
		displayName,
		pass,
		newUser,
		friends,
		loginError,
		groups,
		current,
		displayName,
		persist,
		newUser,
		groupError: state.group.error,
		authError: state.auth.error,
		sessionError: state.session.error,
		userError: state.user.error,
		currentHistory
	}
}

class App extends Component {
	
	constructor() {
		super()
		this.state={active:'current', hidden: false}
		this.timeManager = new TimeMan()
	}

	get token () { return localStorage.getItem('svz-watch-together-user-token') }

	componentDidMount(){
		const {chrome} = window;
		const {id} = this.props;
		this.socket = openSocket('http://localhost');
		this.socket.on('group', function(data){
			this.props.insert({group: data})
		})
		this.socket.on('play', function(data){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {type: "play"}, function(response){
					console.log(response);
				})
			})
		})
		this.socket.on('buffer', function(data){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {type: "buffer"}, function(response){
					console.log(response);
				})
			})
		})
		this.socket.on('pause', function(data){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {type: "pause"}, function(response){
					console.log(response);
				})
			})
		})
		this.socket.on('seek', function(data){
			const {type} = this.props;
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				if (data.admin){
					this.handleSeek(data.seek)
				}
				if (!data.admin && (type === 'admin' || type === 'owner')){
					this.approveSeek(data.user, data.seek)
				}
			})
		})
		this.socket.on('video', function(data){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {type: "episode", id}, function(response){
					console.log(response);
				})
			})
		})
		this.socket.on('privileges', function(data){
			if (data.id.includes(this.props.id)){
				this.props.this.props.update({session: {privileges: data.privs}})
			}
		})
		this.socket.on('approve', function(data){
			if (this.props.privileges[data.type]){
				if (data.time)
				this.setState({approving: data});
			}
		})
	}

	sendApprove = approve => this.socket.emit('adminResponse', {approve, token: this.token})

	handleSeek = seek => {
		const {chrome} = window;
		this.setState({active: 'current'})
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {type: "seek", seek}, function(response){
				console.log(response);
			})
		})
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
			currentHistory, 
			update, 
			persist, 
			newUser
		} = this.props
		const {active, hidden, approving} = this.state
		const {pickActive, seek, sendApprove, socket} = this;
		const contents = [
			<CurrentState friends={friendsList} />,
			<LoginPanel pass={pass} login = {(pass, persist) => login(displayName, pass, persist, socket)} update={update} />,
			<NewUser userError = {userError} approve={email => createUser(displayName, pass, email, persist, socket)} editEmail={ (email) => update({user: {email}})} displayName={displayName} email={email} reset={pickActive}/>,
			<Groups pickActive = {pickActive} groups={groups} />,
			<ProfilePanel />,
			<InviteUser invite={inviteUser} friends={friendsList}/>,
			<ApprovePanel action={approving} approve={() => sendApprove(true)} reject={() => sendApprove(false)} reset={pickActive} />,
			<History currentHistory={currentHistory} />,
			<NewGroup />
		]
		return (
			<div id={filterJoin(["popup-container", [hidden, 'hidden']])}>
				<div><Button onClick={() => pickActive()}>Session</Button>{displayName ? <><Button onClick={() => pickActive(3)}>Group</Button><Button>History</Button><Button>Settings</Button></> : null}</div>
				<div>{
					contents.map((content, index) => {
						const position = active < index ? 'right' : active > index ? 'left' : 'active'
						return (
							<div key={'svz-tab-' + index} className={'tab ' + position} >
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

export default connect (mapStateToProps, {signIn, logout, update, overwrite, createUser}) (App);
