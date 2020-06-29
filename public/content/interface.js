class svzWTInterfacer {
	constructor(){
		this.controller = new Huluer || new Crunchyroller || new Netflixer || new Videor;
		this.controller.addListener('video', videoSend)
		this.controller.addListener('play', playSend)
		this.controller.addListener('seek', seekSend)
		this.controller.addListener('buffer', bufferSend)
	}

	videoSend = data => {
		chrome.runtime.sendMessage({type: "video", data}, function(response) {console.log(response)})
	}

	playSend = () => {
		chrome.runtime.sendMessage({type: "play" }, function(response) {console.log(response)})
	}

	seekSend = time => {
		chrome.runtime.sendMessage({type: "seek", time}, function(response) {console.log(response)})
	}

	bufferSend = e => {
		chrome.runtime.sendMessage({type: "buffer"}, function(response) {console.log(response)})
	}
}

const watch_interfacer = new svzWTInterfacer