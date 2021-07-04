"use strict";

var _server = _interopRequireDefault(require("./server.js"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./db.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_server["default"].listen(process.env.PORT, function () {
  console.log("listen ".concat(process.env.PORT));
});