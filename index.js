// Initial declartions 
const video = document.getElementById('video');
const videoSrc = 'https://cdn.jwplayer.com/manifests/8Hw3FD28.m3u8';
const timeSlider = document.getElementById('time-slider');
const rewindButton = document.getElementById('rewind');
const playButton = document.getElementById('play');
const forwardButton = document.getElementById('forward');
const muteButton = document.getElementById('mute');
const volumeSlider = document.getElementById('volume-slider');

let duration;

// Check first for native HLS support in Browser else init HLS.js
if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoSrc;
} else if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
}

// Helper functions
const iconSwitching = (iconToShow, iconToHide) => {
    iconToShow.style.display = "contents";
    iconToHide.style.display = "none";
}

// Handlers
const setTime = (val) => video.currentTime = val;

const rewindVideo = () => video.currentTime -= 5;

const playVideo = e => {
    if (video.paused) {
        video.play();
        iconSwitching(e.currentTarget.querySelectorAll("i")[1], e.currentTarget.querySelectorAll("i")[0]);
    } else {
        video.pause();
        iconSwitching(e.currentTarget.querySelectorAll("i")[0], e.currentTarget.querySelectorAll("i")[1]);
    }
};

const forwardVideo = () => video.currentTime += 5;

const muteVideo = e => {
    video.muted = !video.muted

    if(video.muted) {
        iconSwitching(e.currentTarget.querySelectorAll("i")[1], e.currentTarget.querySelectorAll("i")[0]);
    } else {
        iconSwitching(e.currentTarget.querySelectorAll("i")[0], e.currentTarget.querySelectorAll("i")[1]);
    }
}

const setVolume = (val) => video.volume = val/100;

// Video Events
video.onloadeddata = e => { //? Set correct time slider values when video has been loaded
    duration = Math.trunc(e.currentTarget.duration);
    timeSlider.max = duration;
}

video.ontimeupdate = e => { //? Adjust time slider value when video time changes
    const currentTime = Math.trunc(e.currentTarget.currentTime);
    timeSlider.value = currentTime;
}

video.onvolumechange = e => { //TODO fix shifting of elements on the left button container
    const volume = e.currentTarget.volume;
    if(volume === 0) {
        iconSwitching(muteButton.querySelectorAll("i")[1], muteButton.querySelectorAll("i")[0]);
    } else {
        iconSwitching(muteButton.querySelectorAll("i")[0], muteButton.querySelectorAll("i")[1]);
    }
}

// Control Interactions
timeSlider.oninput = e => setTime(e.currentTarget.value);
rewindButton.onclick = () => rewindVideo();
playButton.onclick = e => playVideo(e);
forwardButton.onclick = () => forwardVideo();
muteButton.onclick = e => muteVideo(e);
volumeSlider.oninput = e => setVolume(e.currentTarget.value);