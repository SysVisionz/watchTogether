const svzNetflixer = new Netflixer;

svzNetflixer.addChangeListener('video', videoSend)
svzNetflixer.addChangeListener('play', playSend)
svzNetflixer.addChangeListener('seek', seekSend)
svzNetflixer.addChangeListener('buffer', bufferSend)

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