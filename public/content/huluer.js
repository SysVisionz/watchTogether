class Huluer {
	constructor (){
		this.listeners = {
			play: [],
			buffer: [],
			video: [],
			seek: []
		}
		this.ready = false;
		if (this.player){
			this.player.addEventListener('pause', this.handlePause);
			this.player.addEventListener('play', this.handlePlay);
			this.player.addEventListener('seeking', this.handleSeek);
			this.player.addEventListener('waiting', this.handleWait);
			this.player.addEventListener('canplaythrough', this.handleChange);
			this.currentId = this.id
		}
		else {
			document.getElementsByTagName('video')[0].addEventListener('play', this.attemptInit)
		}
	}

	attemptInit = () => {
		if (this.player && this.ready === false){
			this.player.addEventListener('pause', this.handlePause);
			this.player.addEventListener('play', this.handlePlay);
			this.player.addEventListener('seeking', this.handleSeek);
			this.player.addEventListener('waiting', this.handleWait);
			this.player.addEventListener('canplaythrough', this.handleChange);
			this.currentId = this.id
			this.ready = true;
			document.getElementsByTagName('video')[0].removeEventListener('play', this.attemptInit);
		}
	}

	get player () { return document.getElementsByTagName('video')[0].__HuluDashPlayer__}

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

	handleSeek = e => {
		for (const i in this.listeners.seek){
			this.listeners.seek[i](this.time)
		}
	}

	handleChange = e => {
		const {video} = this.listeners;
		if (this.id !== this.currentId){
			for (const i in video){
				video[i](this.id);
			}
			this.currentId = this.id
		}
	}

	get id () { return video_to_watch.entityId || null }

	addChangeListener = (type, listener) => {
		this.listeners[type].push(listener)
	}

	set time (setTime) {
		this.player.currentTime = setTime;
	}

	get time () {
		return this.player.currentTime;
	}

}
export {Huluer}