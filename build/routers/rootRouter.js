"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _rootController = require("../controllers/rootController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootRouter = _express["default"].Router();

rootRouter.route("/").get(_rootController.getRoot);
rootRouter.get("/search", _rootController.search);
var _default = rootRouter;
exports["default"] = _default;