/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("var video = document.querySelector(\"video\"); // Play button\n\nvar playBtn = document.querySelector(\"#playBtn\");\nvar muteBtn = document.querySelector(\"#mutedBtn\");\nplayBtn.addEventListener(\"click\", handlePlayBtnClick);\n\nfunction handlePlayBtnClick() {\n  if (video.paused) {\n    video.play();\n    playBtn.innerHTML = \"STOP\";\n  } else {\n    video.pause();\n    playBtn.innerHTML = \"PLAY\";\n  }\n} // Volume button\n\n\nvar volumeBar = document.querySelector(\"#volumeBar\");\nvar currentVolume;\nvar loadedVolume = video.volume;\nvolumeBar.value = loadedVolume;\nmuteBtn.addEventListener(\"click\", handleMuteBtnClick);\n\nfunction handleMuteBtnClick() {\n  currentVolume = volumeBar.value;\n\n  if (currentVolume != 0) {\n    muteBtn.innerHTML = \"UNMUTE\";\n    loadedVolume = volumeBar.value;\n    video.volume = 0;\n    volumeBar.value = 0;\n  } else {\n    muteBtn.innerHTML = \"MUTE\";\n    video.volume = loadedVolume;\n    volumeBar.value = loadedVolume;\n  }\n}\n\nvolumeBar.addEventListener(\"input\", handleVolumeChange);\n\nfunction handleVolumeChange() {\n  video.volume = volumeBar.value;\n  currentVolume = video.volume;\n} // Time-line bar\n\n\nvar videoDuration = document.querySelector(\"#videoDuration\");\nvar timeLineBar = document.querySelector(\"#timeLineBar\");\nvar currentTime = document.querySelector(\"#videoCurrentTime\");\n\nvideo.onloadedmetadata = function () {\n  videoDuration.innerHTML = Math.floor(video.duration);\n  timeLineBar.max = Math.floor(video.duration);\n};\n\nvideo.ontimeupdate = function (event) {\n  currentTime.innerHTML = Math.floor(event.target.currentTime);\n  timeLineBar.value = Math.floor(event.target.currentTime);\n};\n\ntimeLineBar.addEventListener(\"input\", handleTimeLineChange);\n\nfunction handleTimeLineChange() {\n  video.currentTime = timeLineBar.value;\n} // Full screen button\n\n\nvar fullScreenBtn = document.querySelector(\"#fullScreenBtn\");\n\nfullScreenBtn.onclick = function () {\n  // requestFullscreen() must be in an event handler or it will fail\n  video.requestFullscreen();\n};\n\n//# sourceURL=webpack://wetube/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;