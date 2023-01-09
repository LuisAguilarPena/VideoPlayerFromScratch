// Initial declartions 
const video = document.getElementById('video');
const videoSrc = 'https://cdn.jwplayer.com/manifests/8Hw3FD28.m3u8';
const playButton = document.getElementById('play');
const timeSlider = document.getElementById('time-slider');

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

// Button Handlers
const playVideo = e => {
    if (video.paused) {
        video.play();
        iconSwitching(e.currentTarget.querySelectorAll("i")[1], e.currentTarget.querySelectorAll("i")[0]);
    } else {
        video.pause();
        iconSwitching(e.currentTarget.querySelectorAll("i")[0], e.currentTarget.querySelectorAll("i")[1]);
    }
};

// Sliders interaction
const setTime = () => console.error(', ,  ->', );

// Control Interactions
playButton.onclick = e => playVideo(e);

timeSlider.oninput = e => setTime(e);