"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose$connect;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_dotenv["default"].config();

var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, (_mongoose$connect = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, _defineProperty(_mongoose$connect, "useNewUrlParser", true), _defineProperty(_mongoose$connect, "useFindAndModify", false), _mongoose$connect));
var db = mongoose.connection;
db.on("error", console.error.bind(console, "ERROR ㅜㅜ"));
db.once("open", function () {
  console.log("🍎🍇 DB is connected 🍇🥥 ");
});