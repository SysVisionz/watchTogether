class Crunchyroller {

	constructor(){
		this.listeners = {
			video: [],
			play: [],
			buffer: [],
			seek: [],
		}
		this.curTime = null;
		this.buffering = false;
		this.player.on('play', this.handlePlay)
		this.player.on('pause', this.handlePause)
		this.player.on('timeupdate', this.handleUpdate);
		this.player.on('ready', this.handleChange);
	}

	handlePlay = () => {
		const {buffer, play} = this.listeners
		if (this.buffering){
			for (const i in buffer){
				buffer[i](false)
			}
			this.buffering = false;
			this.removeListener('timeupdate', this.handlePlay);
		}
		for (const i in play){
			play[i](true);
		}
		this.bufferTimeout = setTimeout( this.handleWait, 750)		
	}

	handlePause = () => {
		clearTimeout(this.bufferTimeout);
		for (const i in this.listeners.play){
			this.listeners.play[i](false)
		}
	}

	handleChange = () => {
		const {show, season, episode} = this;
		for (const i in this.listeners.video){
			this.listeners.video[i]({
				link: 'https://www.crunchyroll.com/' + show.href + '/' + episode.href,
				episode: episode.title,
				season,
				show: show.title
			})
		}
	}

	handleWait = () => {
		this.buffering = true;
		for (const i in this.listeners.buffer){
			this.listeners.buffer[i](true)
		}
		this.pause();
		this.addListener('timeupdate', this.handlePlay)
	}

	handleUpdate = vals => {
		const {seconds} = vals;
		const {curTime, buffering, seeking, handlePlay} = this;
		this.curTime = seconds;
		clearTimeout(this.bufferTimeout);
		if (!seeking && !buffering){
			if (curTime > seconds)
			this.bufferTimeout = setTimeout( this.handleWait, 750)
		}
		if (seeking){
			handlePlay();
		}
		if (buffering){
			handlePlay();
		}
	}

	handleSeek = e => {
		this.seeking = true;
		for (const i in this.listeners.seek){
			this.listeners.seek[i](this.time)
		}
	}

	get show(){ 
		let href = window.location.pathname.substr(1);
		href = href.substr(0, href.indexOf('/'))
		let title = document.title;
		title = title.substr(0, title.indexOf('Episode') - 1)
		return {href, title}
	}

	get episode(){
		let href = window.location.pathname.substr(1);
		href = href.substr(href.indexOf('/')+1)
		href = href.substr(0, ~href.indexOf('/') || undefined)
		let title = document.title;
		title = title.substr(title.indexOf('Episode') + 8)
		let index = title.substr(0, title.indexOf(','))
		title = title.substr(title.indexOf(',') + 2)
		title = title.substr(0, title.indexOf(', - Watch on Crunchyroll'))
		return {href, title, index}
	}

	get season(){
		return document.title.substring(document.title.indexOf('Season')+7, document.title.indexOf('Episode')).trim()
	}

	get element () { return this.session.element }

	get id () { return this.session ? this.session.videoId : null }

	get session () { return this.API.getOpenPlaybackSessions()[0]}

	get sessionId() { return this.API.videoPlayer.getAllPlayerSessionIds()[0]}

	set time (seek) { 
		this.seeking = true;
		this.handleseek(seek)
		return this.player.seek(seek*1000); 
	}

	get time () { return this.player.getCurrentTime()/1000; }

	set movie (id) { window.location = "https://www.netflix.com/watch/"+id; }

	get player () {return VILOS_PLAYERJS}

	addListener = (type, callBack) => this.listeners[type].push(callBack)

	removeListener = (type, callBack) => {
		if (this.listeners[type].includes(callBack)){
			this.listeners[type].splice(this.listeners[type].indexOf(callBack), 1);
		}
	}

	pause = () => {
		this.player.pause();
	}

	play = () => {
		this.player.play();
	}

}
export {Crunchyroller};