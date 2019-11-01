const svzVideoer = new VideoManager;

svzVideoer.addChangeListener('video', videoSend)
svzVideoer.addChangeListener('play', playSend)
svzVideoer.addChangeListener('seek', seekSend)
svzVideoer.addChangeListener('buffer', bufferSend)

const videoSend = e => {
	chrome.runtime.sendMessage({changeType: "video" videoId: e}, function(response) {console.log(response)})
}

const playSend = e => {
	chrome.runtime.sendMessage({changeType: "play" videoId: e}, function(response) {console.log(response)})
}

const seekSend = e => {
	chrome.runtime.sendMessage({changeType: "seek" videoId: e}, function(response) {console.log(response)})
}

const bufferSend = e => {
	chrome.runtime.sendMessage({changeType: "buffer" videoId: e}, function(response) {console.log(response)})
}