class ABCer {

	constructor(started){
		if (started){
			document.getElementsByClassName('pl-idle-btn')[0].click();
		}
		this.listeners = {
			video: [],
			play: [],
			buffer: [],
			seek: []
		}
		this.buffering = false;
		this.video.addEventListener('play', this.handlePlay)
		this.video.addEventListener('pause', this.handlePause)
		this.video.addEventListener('waiting', this.handleWait);
		this.video.addEventListener('seeking', this.handleSeek);
		this.video.addEventListener('canplaythrough', this.handleChange)
	}

	get video(){return document.getElementsByClassName('amp-media-element')[0]}

	handlePlay = () => {
		const {buffer, play} = this.listeners
		if (this.buffering){
			for (const i in buffer){
				buffer[i](false)
			}
			this.buffering = false;
		}
		for (const i in play){
			play[i](true);
		}
	}

	handlePause = () => {
		for (const i in this.listeners.play){
			this.listeners.play[i](false)
		}
	}

	handleWait = () => {
		this.buffering = true;
		for (const i in this.listeners.buffer){
			this.listeners.buffer[i](true)
		}
	}

	handleSeek = () => {
		for (const i in this.listeners.seek){
			this.listeners.seek[i](this.time)
		}
	}

	get element () { return this.session.element }

	get id () { return this.session ? this.session.videoId : null }

	get session () { return this.api.getOpenPlaybackSessions()[0]}

	get sessionId() { return this.api.videoPlayer.getAllPlayerSessionIds()[0]}

	set time (seek) { return this.player.seek(seek*1000); }

	get time () { return this.player.getCurrentTime()/1000; }

	set movie (id) { window.location = "https://www.netflix.com/watch/"+id; }

	get player () {return this.api.videoPlayer.getVideoPlayerBySessionId(this.sessionId)}

	get api () { return netflix.appContext.getPlayerApp().getAPI() }

	get video () { return this.element.getElementsByTagName('video')[0]}

	addListener = (type, callBack) => this.listeners[type].push(callBack)

	removeListener = (type, callBack) => {
		if (this.listeners[type].includes(callBack)){
			this.listeners[type].splice(this.listeners[type].indexOf(callBack), 1);
		}
	}

	pause(){
		this.video.pause();
	}

	play(){
		this.video.play();
	}


}
export {Netflixer};