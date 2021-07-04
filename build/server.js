"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _helmet = _interopRequireDefault(require("helmet"));

var _rootRouter = _interopRequireDefault(require("./routers/rootRouter"));

var _usersRouter = _interopRequireDefault(require("./routers/usersRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _middlewares = require("./middlewares");

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _expressFlash = _interopRequireDefault(require("express-flash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _helmet["default"])({
  contentSecurityPolicy: false
}));
app.set("views", process.cwd() + "/src/views");
app.engine("pug", require("pug").__express);
app.use("/tmp", _express["default"]["static"]("tmp"));
app.use("/assets", _express["default"]["static"]("assets"));
app.use((0, _expressSession["default"])({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    maxAge: 36000
  },
  store: _connectMongo["default"].create({
    mongoUrl: process.env.MONGO_URL
  })
}));
app.use(_middlewares.localMiddleware);
app.use((0, _expressFlash["default"])());
app.use("/", _rootRouter["default"]);
app.use("/users", _usersRouter["default"]);
app.use("/videos", _videoRouter["default"]);
var _default = app;
exports["default"] = _default;