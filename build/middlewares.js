"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadVideoFile = exports.onlyPublic = exports.onlyPrivate = exports.localMiddleware = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

/*
const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const multerUploader = multerS3({
  s3: s3,
  bucket: "wetubeeee",
  acl: "public-read",
});
*/
var localMiddleware = function localMiddleware(req, res, next) {
  res.locals.isLogined = req.session.isLogined;
  res.locals.siteName = "wetube";
  next();
};

exports.localMiddleware = localMiddleware;

var onlyPrivate = function onlyPrivate(req, res, next) {
  if (req.session.isLogined) {
    return next();
  }

  console.log("404 page not found");
  return res.sendStatus(404);
};

exports.onlyPrivate = onlyPrivate;

var onlyPublic = function onlyPublic(req, res, next) {
  if (!req.session.isLogined) {
    return next();
  }

  console.log("404 page not found");
  return res.sendStatus(404);
}; // Local storage path


exports.onlyPublic = onlyPublic;

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "tmp/videos/");
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

var upload = (0, _multer["default"])({
  dest: "tmp/videos",
  limits: {
    fileSize: 10000000
  },
  storage: storage
});
var uploadVideoFile = upload.single("videoFile");
exports.uploadVideoFile = uploadVideoFile;