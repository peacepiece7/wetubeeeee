"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postEditVideo = exports.getEditVideo = exports.deleteVideo = exports.getShowVideo = exports.postUploadVideo = exports.getUploadVideo = void 0;

var _Video = _interopRequireDefault(require("../models/Video.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// UPLOAD
var getUploadVideo = function getUploadVideo(req, res) {
  res.render("upload.pug", {
    pageTitle: "UPLOAD"
  });
};

exports.getUploadVideo = getUploadVideo;

var postUploadVideo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, title, description, genres, path;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // fileUrl: req.file ? req.file.location : fileUrl,
            console.log(req);
            _req$body = req.body, title = _req$body.title, description = _req$body.description, genres = _req$body.genres, path = req.file.path;
            _context.prev = 2;
            _context.next = 5;
            return _Video["default"].create({
              fileUrl: path,
              title: title,
              description: description,
              genres: genres.split(",")
            });

          case 5:
            return _context.abrupt("return", res.status(200).redirect("/"));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            req.flash("error", "비디오를 만드는데 실패했습니다.");
            return _context.abrupt("return", req.status(400).redirect("/"));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8]]);
  }));

  return function postUploadVideo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // SHOW VIDEO


exports.postUploadVideo = postUploadVideo;

var getShowVideo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.prev = 1;
            _context2.next = 4;
            return _Video["default"].findById({
              _id: id
            });

          case 4:
            video = _context2.sent;
            res.status(200).render("videoDetail.pug", {
              video: video
            });
            _context2.next = 12;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            req.flash("error", "접근할 수 없는 비디오입니다.");
            res.sendStatus(404);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function getShowVideo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getShowVideo = getShowVideo;

var deleteVideo = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _Video["default"].findByIdAndDelete({
              _id: id
            });

          case 4:
            req.flash("info", "비디오가 삭제 되었습니다.");
            return _context3.abrupt("return", res.status(200).redirect("/"));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            req.flash("error", "비디오를 지울 수 없습니다.");
            return _context3.abrupt("return", res.status(200).redirect("/"));

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function deleteVideo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteVideo = deleteVideo;

var getEditVideo = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Video["default"].findById({
              _id: id
            });

          case 4:
            video = _context4.sent;
            return _context4.abrupt("return", res.render("videoEdit.pug", {
              video: video
            }));

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            req.flash("error", "접근할 수 없는 비디오입니다.");
            return _context4.abrupt("return", res.status(400).redirect("/"));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function getEditVideo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getEditVideo = getEditVideo;

var postEditVideo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, _req$body2, title, description, genres;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, genres = _req$body2.genres;
            _context5.prev = 1;
            _context5.next = 4;
            return _Video["default"].findByIdAndUpdate({
              _id: id
            }, {
              title: title,
              description: description,
              genres: genres.split(",")
            });

          case 4:
            return _context5.abrupt("return", res.status(200).redirect("/videos/show/".concat(id)));

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](1);
            req.flash("error", "비디오 편집을 실패했습니다.");
            return _context5.abrupt("return", res.status(400).redirect("/videos/show/".concat(id)));

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 7]]);
  }));

  return function postEditVideo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postEditVideo = postEditVideo;