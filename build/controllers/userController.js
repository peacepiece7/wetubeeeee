"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.finishGithubLogin = exports.startGithubLogin = exports.editUser = exports.profile = exports.postjoin = exports.getjoin = exports.logout = exports.postLogin = exports.getLogin = void 0;

var _User = _interopRequireDefault(require("../models/User.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getLogin = function getLogin(req, res) {
  res.render("login.pug");
};

exports.getLogin = getLogin;

var postLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, password, userDoc;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, password = _req$body.password;
            _context.next = 3;
            return _User["default"].findOne({
              name: name
            });

          case 3:
            userDoc = _context.sent;

            _bcrypt["default"].compare(password, userDoc.password, function (error, success) {
              if (success) {
                req.session.user = userDoc;
                req.session.isLogined = true;
                req.flash("info", "로그인 되었습니다.");
                return res.status(200).redirect("/");
              }

              return res.status(400).redirect("/users/login");
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function postLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postLogin = postLogin;

var logout = function logout(req, res) {
  req.session.destroy();
  req.flash("info", "로그아웃 되었습니다.");
  res.status(200).redirect("/");
};

exports.logout = logout;

var getjoin = function getjoin(req, res) {
  res.render("join.pug");
};

exports.getjoin = getjoin;

var postjoin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, name, email, password, password2, user, userEmail;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password, password2 = _req$body2.password2;

            if (!(password !== password2)) {
              _context2.next = 4;
              break;
            }

            req.flash("error", "패스워드가 일치하지 않습니다.");
            return _context2.abrupt("return", res.redirect("/users/join"));

          case 4:
            _context2.next = 6;
            return _User["default"].findOne({
              name: name
            });

          case 6:
            user = _context2.sent;
            _context2.next = 9;
            return _User["default"].findOne({
              email: email
            });

          case 9:
            userEmail = _context2.sent;

            if (!userEmail) {
              _context2.next = 13;
              break;
            }

            console.log("해당 이매일은 소셜 로그인으로 가입되어 있습니다.");
            return _context2.abrupt("return", res.redirect("/users/join"));

          case 13:
            if (!user) {
              _context2.next = 16;
              break;
            }

            console.log("이미 사용중인 아이디 입니다.");
            return _context2.abrupt("return", res.redirect("/users/join"));

          case 16:
            _context2.prev = 16;
            _context2.next = 19;
            return _User["default"].create({
              name: name,
              email: email,
              password: password
            });

          case 19:
            req.flash("error", "가입되었습니다.");
            return _context2.abrupt("return", res.redirect("/"));

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](16);
            return _context2.abrupt("return", res.redirect("/users/join"));

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[16, 23]]);
  }));

  return function postjoin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postjoin = postjoin;

var profile = function profile(req, res) {
  res.render("userProfile.pug");
};

exports.profile = profile;

var editUser = function editUser(req, res) {
  res.render("userEdit.pug");
};

exports.editUser = editUser;

var startGithubLogin = function startGithubLogin(req, res) {
  var baseUrl = "https://github.com/login/oauth/authorize";
  var config = {
    client_id: process.env.GIT_ID,
    allow_signup: false,
    scope: "read:user user:email"
  };
  var params = new URLSearchParams(config).toString();
  var finalUrl = "".concat(baseUrl, "?").concat(params);
  return res.redirect(finalUrl);
};

exports.startGithubLogin = startGithubLogin;

var finishGithubLogin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var baseUrl, config, params, finalUrl, tokenRequest, access_token, apiUrl, userData, emailData, email, user, _user;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            baseUrl = "https://github.com/login/oauth/access_token";
            config = {
              client_id: process.env.GIT_ID,
              client_secret: process.env.GIT_SECRET,
              code: req.query.code
            };
            params = new URLSearchParams(config).toString();
            finalUrl = "".concat(baseUrl, "?").concat(params);
            _context3.next = 6;
            return (0, _nodeFetch["default"])(finalUrl, {
              method: "POST",
              headers: {
                Accept: "application/json"
              }
            });

          case 6:
            _context3.next = 8;
            return _context3.sent.json();

          case 8:
            tokenRequest = _context3.sent;

            if (!("access_token" in tokenRequest)) {
              _context3.next = 45;
              break;
            }

            access_token = tokenRequest.access_token;
            apiUrl = "https://api.github.com";
            _context3.next = 14;
            return (0, _nodeFetch["default"])("".concat(apiUrl, "/user"), {
              headers: {
                Authorization: "token ".concat(access_token)
              }
            });

          case 14:
            _context3.next = 16;
            return _context3.sent.json();

          case 16:
            userData = _context3.sent;
            _context3.next = 19;
            return (0, _nodeFetch["default"])("".concat(apiUrl, "/user/emails"), {
              headers: {
                Authorization: "token ".concat(access_token)
              }
            });

          case 19:
            _context3.next = 21;
            return _context3.sent.json();

          case 21:
            emailData = _context3.sent;
            email = emailData.find(function (email) {
              return email.primary === true && email.verified === true;
            }); // email is not existing

            if (email) {
              _context3.next = 26;
              break;
            }

            console.log("email is not existing");
            return _context3.abrupt("return", res.redirect("/users/login"));

          case 26:
            _context3.next = 28;
            return _User["default"].findOne({
              email: email.email
            });

          case 28:
            user = _context3.sent;

            if (!user) {
              _context3.next = 36;
              break;
            }

            req.session.user = user;
            req.session.isLogined = true;
            req.flash("info", "로그인 되었습니다.");
            return _context3.abrupt("return", res.redirect("/users/login"));

          case 36:
            _context3.next = 38;
            return _User["default"].create({
              name: userData.login,
              email: email.email,
              password: "",
              socialLogin: true
            });

          case 38:
            _user = _context3.sent;
            req.session.user = _user;
            req.session.isLogined = true;
            req.flash("info", "로그인 되었습니다.");
            return _context3.abrupt("return", res.redirect("/users/login"));

          case 43:
            _context3.next = 47;
            break;

          case 45:
            console.log("cant find access token");
            return _context3.abrupt("return", res.redirect("/users/login"));

          case 47:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function finishGithubLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.finishGithubLogin = finishGithubLogin;