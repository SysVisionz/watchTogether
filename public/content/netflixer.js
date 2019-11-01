class Netflixer {

	constructor(){
		netflix.appContext.getPlayerApp().addChangeListener(this.handleChange)
		this.currentId = this.id;
		this.currentVideo = this.video;
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

	handleChange = e => {
		const {video} = this.listeners;
		if (this.id && this.video && this.id !== this.currentId){
			for (const i in video){
				video[i](this.id);
			}
			this.currentVideo.removeEventListener('play', this.handlePlay)
			this.currentVideo.removeEventListener('pause', this.handlePause)
			this.currentVideo.removeEventListener('waiting', this.handleWait);
			this.currentVideo.removeEventListener('seeking', this.handleSeek);
			this.currentVideo.removeEventListener('canplaythrough', this.handleChange)
			this.video.addEventListener('play', this.handlePlay)
			this.video.addEventListener('pause', this.handlePause)
			this.video.addEventListener('waiting', this.handleWait);
			this.video.addEventListener('seeking', this.handleSeek);
			this.video.addEventListener('canplaythrough', this.handleChange)
			this.currentId = this.id
		}
	}

	handleSeek = () => {
		for (const i in this.listeners.seek){
			this.listeners.seek[i](this.time)
		}
	}

	get element () { return this.session.element }

	get id () { return this.session ? this.session.videoId : null }

	get session () { return this.API.getOpenPlaybackSessions()[0]}

	get sessionId() { return this.API.videoPlayer.getAllPlayerSessionIds()[0]}

	set time (seek) { return this.player.seek(seek*1000); }

	get time () { return this.player.getCurrentTime()/1000; }

	set movie (id) { window.location = "https://www.netflix.com/watch/"+id; }

	get player () {return this.API.videoPlayer.getVideoPlayerBySessionId(this.sessionId)}

	get API () { return netflix.appContext.getPlayerApp().getAPI() }

	get video () { return this.element.getElementsByTagName('video')[0]}

	addChangeListener = (type, callBack) => this.listeners[type].push(callBack)

	removeChangeListener = (type, callBack) => {
		if (this.listeners[type].includes(callBack)){
			this.listeners[type].splice(this.listeners[type].indexOf(callBack), 1);
		}
	}

}
export {Netflixer};