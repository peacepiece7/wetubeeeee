"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoController = require("../controllers/videoController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router();

videoRouter.route("/upload").get(_videoController.getUploadVideo).post(_middlewares.uploadVideoFile, _videoController.postUploadVideo);
videoRouter.get("/show/:id", _videoController.getShowVideo);
videoRouter.get("/delete/:id", _videoController.deleteVideo);
videoRouter.route("/edit/:id").get(_videoController.getEditVideo).post(_videoController.postEditVideo);
var _default = videoRouter;
exports["default"] = _default;