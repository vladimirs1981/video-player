const player = document.querySelector('.player');
const video = player.querySelector('.player-video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress-bar');
const playBtn = player.querySelector('.toggle-play');
const stopBtn = player.querySelector('.stop');
const muteBtn = player.querySelector('.toggle-mute');
const fullScrBtn = player.querySelector('.toggle-fullscreen');
const skipBtn = player.querySelectorAll('[data-skip]');
const timer = player.querySelector('.timer');
const volumeSlider = player.querySelector('.volume');
const speedSlider = player.querySelector('.playbackRate');

function updateRangeOutputsOnLoad() {
    volumeSlider.value = video.volume;
    document.querySelector('.volumeOut').innerHTML =
        Math.floor(video.volume * 100) + '%';
    speedSlider.value = video.playbackRate;
    document.querySelector('.speedOut').innerHTML = video.playbackRate + 'x';
}

function togglePlay() {
    const playState = video.paused ? 'play' : 'pause';
    video[playState]();
}

function toggleMute() {
    if (!video.volume) {
        return;
    }
    video.muted = !video.muted;
    updateMuteButton();
}

function stopVideo() {
    video.pause();
    video.currentTime = 0;
}

function updatePlayButton() {
    const togglePlayBtn = document.querySelector('.toggle-play');

    if (this.paused || this.ended) {
        togglePlayBtn.innerHTML = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6.741c0-1.544 1.674-2.505 3.008-1.728l9.015 5.26c1.323.771 1.323 2.683 0 3.455l-9.015 5.258C7.674 19.764 6 18.803 6 17.26V6.741zM17.015 12L8 6.741V17.26L17.015 12z" fill="currentColor"/></svg>`;
    } else {
        togglePlayBtn.innerHTML = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1zm6 0a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1z" fill="currentColor"/></svg>`;
    }
}

function updateMuteButton() {
    const toggleMuteBtn = document.querySelector('.toggle-mute');

    if (video.muted || video.volume === 0.0) {
        toggleMuteBtn.innerHTML = `<svg
        width="20px"
        height="20px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.5 5h2.79l3.86-3.83.85.35v13l-.85.33L4.29 11H1.5l-.5-.5v-5l.5-.5zm3.35 5.17L8 13.31V2.73L4.85 5.85 4.5 6H2v4h2.5l.35.17zm9.381-4.108l.707.707L13.207 8.5l1.731 1.732-.707.707L12.5 9.207l-1.732 1.732-.707-.707L11.793 8.5 10.06 6.77l.707-.707 1.733 1.73 1.731-1.731z"
        />
    </svg>`;
    } else {
        toggleMuteBtn.innerHTML = `<svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 4.83h2.79L8.15 1l.85.35v13l-.85.33-3.86-3.85H1.5l-.5-.5v-5l.5-.5zM4.85 10L8 13.14V2.56L4.85 5.68l-.35.15H2v4h2.5l.35.17zM15 7.83a6.97 6.97 0 0 1-1.578 4.428l-.712-.71A5.975 5.975 0 0 0 14 7.83c0-1.4-.48-2.689-1.284-3.71l.712-.71A6.971 6.971 0 0 1 15 7.83zm-2 0a4.978 4.978 0 0 1-1.002 3.004l-.716-.716A3.982 3.982 0 0 0 12 7.83a3.98 3.98 0 0 0-.713-2.28l.716-.716c.626.835.997 1.872.997 2.996zm-2 0c0 .574-.16 1.11-.44 1.566l-.739-.738a1.993 1.993 0 0 0 .005-1.647l.739-.739c.276.454.435.988.435 1.558z"/></svg>`;
    }
}

function skip() {
    video.currentTime += parseInt(this.dataset.skip);
}

function progressBarAndTimerUpdate() {
    let minutes = Math.floor(video.currentTime / 60);
    let seconds = Math.floor(video.currentTime - minutes * 60);
    let durationMinutes = Math.floor(video.duration / 60);
    let durationSeconds = Math.floor(video.duration - minutes * 60);
    let minuteValue;
    let secondValue;
    let minuteDurationValue;
    let secondDurationValue;

    if (durationMinutes < 10) {
        minuteDurationValue = '0' + durationMinutes;
    } else {
        minuteDurationValue = durationMinutes;
    }

    if (durationSeconds < 10) {
        secondDurationValue = '0' + durationSeconds;
    } else {
        secondDurationValue = durationSeconds;
    }
    if (minutes < 10) {
        minuteValue = '0' + minutes;
    } else {
        minuteValue = minutes;
    }

    if (seconds < 10) {
        secondValue = '0' + seconds;
    } else {
        secondValue = seconds;
    }

    let videoTime = minuteValue + ':' + secondValue;
    let videoDuration = minuteDurationValue + ':' + secondDurationValue;
    timer.textContent = videoTime + '/' + videoDuration;
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function jump(e) {
    const jumpTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = jumpTime;
}

function openFullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullScreen) {
        video.msRequestFullScreen();
    }
}

function handleVolume() {
    volumeSlider.value = video.muted ? 0 : video.volume;
    document.querySelector('.volumeOut').innerHTML =
        Math.floor(volumeSlider.value * 100) + '%';

    updateMuteButton();
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', progressBarAndTimerUpdate);
video.addEventListener('volumechange', handleVolume);

playBtn.addEventListener('click', togglePlay);
stopBtn.addEventListener('click', stopVideo);
muteBtn.addEventListener('click', toggleMute);
fullScrBtn.addEventListener('click', openFullScreen);

volumeSlider.addEventListener('input', (e) => {
    video.volume = e.target.value;
    document.querySelector('.volumeOut').innerHTML =
        Math.floor(e.target.value * 100) + '%';
});

speedSlider.addEventListener('input', (e) => {
    video.playbackRate = e.target.value;
    document.querySelector('.speedOut').innerHTML = e.target.value + 'x';
});

skipBtn.forEach((button) => button.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', jump);
progress.addEventListener('mousemove', (e) => mousedown && jump(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
