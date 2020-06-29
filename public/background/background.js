const openSocket = require('socket.io-client')
class WatchData{
	constructor(socketTarget){
		this.socket = openSocket(socketTarget);
		this.socket.on('group', function(data){
			this.props.insert({group: data})
		})
		const socket = this.socket;
		socket.on('play', function(data){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {type: "play"}, function(response){
					console.log(response);
				})
			})
		})
		socket.on('buffer', function(data){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {type: "buffer"}, function(response){
					console.log(response);
				})
			})
		})
		socket.on('pause', function(data){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {type: "pause"}, function(response){
					console.log(response);
				})
			})
		})
		socket.on('seek', function(data){
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
		socket.on('video', function(data){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {type: "episode", id}, function(response){
					console.log(response);
				})
			})
		})
		socket.on('privileges', function(data){
			if (data.id.includes(this.props.id)){
				this.props.this.props.update({session: {privileges: data.privs}})
			}
		})
		socket.on('approve', function(data){
			if (this.props.privileges[data.type]){
				if (data.time)
				this.setState({approving: data });
			}
		})
		socket.on('chat', function(data){
			const {index, name, displayName, message} = data;
			switch(data.type){
				case "displayName":
					this.update({session: {chat: {users: {[index]: {displayName}}}}})
					break;
				case "name":
					this.update({session: {chat: {users: {[index]: {name}}}}})
					break;
				case "message":
					const {chat} = this.props;
					this.update({session: {chat: {
						newMessages: this.state.position === 'bottom' ? 0 : chat.newMessages+1,
						messages: chat.messages.concat(data.message)
					}}});
					break;
			}
		})
	}

	socketLogin = token => this.socket.emit('login', {token});

	sendApprove = approve => this.socket.emit('adminResponse', {approve, token: this.token})

	sendChat = entry => this.socket.emit('sendChat', {entry})
}

const watcher = new WatchData('http://localhost')

chrome.runtime.onMessage.addListener((request, sender, response) => {
	switch(request.type){
		case 'login':
			watcher.socketLogin(request.token);
			break;
		case 'video':
			watcher.sendVideo(request.data)
	}
})