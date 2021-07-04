"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router(); // LOGIN


userRouter.route("/login").get(_userController.getLogin).post(_userController.postLogin);
userRouter.get("/logout", _userController.logout); // JOIN

userRouter.route("/join").get(_userController.getjoin).post(_userController.postjoin);
userRouter.get("/profile/:id", _userController.profile);
userRouter.get("/edit/:id", _userController.editUser);
userRouter.get("/github/start", _userController.startGithubLogin);
userRouter.get("/github/finish", _userController.finishGithubLogin);
var _default = userRouter;
exports["default"] = _default;