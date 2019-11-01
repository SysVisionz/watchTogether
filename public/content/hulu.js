const svzHuluer = new Huluer;

svzHuluer.addChangeListener('video', videoSend)
svzHuluer.addChangeListener('play', playSend)
svzHuluer.addChangeListener('seek', seekSend)
svzHuluer.addChangeListener('buffer', bufferSend)

const videoSend = e => {
	chrome.runtime.sendMessage({type: "video" videoId: e}, function(response) {console.log(response)})
}

const playSend = e => {
	chrome.runtime.sendMessage({type: "play" }, function(response) {console.log(response)})
}

const seekSend = e => {
	chrome.runtime.sendMessage({type: "seek" {}}, function(response) {console.log(response)})
}

const bufferSend = e => {
	chrome.runtime.sendMessage({type: "buffer" videoId: e}, function(response) {console.log(response)})
}