"use strict";

var video = document.querySelector("video"); // Play button

var playBtn = document.querySelector("#playBtn");
var muteBtn = document.querySelector("#mutedBtn");
playBtn.addEventListener("click", handlePlayBtnClick);

function handlePlayBtnClick() {
  if (video.paused) {
    video.play();
    playBtn.innerHTML = "STOP";
  } else {
    video.pause();
    playBtn.innerHTML = "PLAY";
  }
} // Volume button


var volumeBar = document.querySelector("#volumeBar");
var currentVolume;
var loadedVolume = video.volume;
volumeBar.value = loadedVolume;
muteBtn.addEventListener("click", handleMuteBtnClick);

function handleMuteBtnClick() {
  currentVolume = volumeBar.value;

  if (currentVolume != 0) {
    muteBtn.innerHTML = "UNMUTE";
    loadedVolume = volumeBar.value;
    video.volume = 0;
    volumeBar.value = 0;
  } else {
    muteBtn.innerHTML = "MUTE";
    video.volume = loadedVolume;
    volumeBar.value = loadedVolume;
  }
}

volumeBar.addEventListener("input", handleVolumeChange);

function handleVolumeChange() {
  video.volume = volumeBar.value;
  currentVolume = video.volume;
} // Time-line bar


var videoDuration = document.querySelector("#videoDuration");
var timeLineBar = document.querySelector("#timeLineBar");
var currentTime = document.querySelector("#videoCurrentTime");

video.onloadedmetadata = function () {
  videoDuration.innerHTML = Math.floor(video.duration);
  timeLineBar.max = Math.floor(video.duration);
};

video.ontimeupdate = function (event) {
  currentTime.innerHTML = Math.floor(event.target.currentTime);
  timeLineBar.value = Math.floor(event.target.currentTime);
};

timeLineBar.addEventListener("input", handleTimeLineChange);

function handleTimeLineChange() {
  video.currentTime = timeLineBar.value;
} // Full screen button


var fullScreenBtn = document.querySelector("#fullScreenBtn");

fullScreenBtn.onclick = function () {
  // requestFullscreen() must be in an event handler or it will fail
  video.requestFullscreen();
};