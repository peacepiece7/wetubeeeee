import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

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

export const localMiddleware = (req, res, next) => {
  res.locals.isLogined = req.session.isLogined;
  res.locals.siteName = "wetubeeeee";
  next();
};

export const onlyPrivate = (req, res, next) => {
  if (req.session.isLogined) {
    return next();
  }
  console.log("404 page not found");
  return res.sendStatus(404);
};

export const onlyPublic = (req, res, next) => {
  if (!req.session.isLogined) {
    return next();
  }
  console.log("404 page not found");
  return res.sendStatus(404);
};

// Local storage path
/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/videos/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
*/
const upload = multer({
  dest: "tmp/videos",
  limits: {
    fileSize: 20000000,
  },
  storage: multerUploader,
});

export const uploadVideoFile = upload.single("videoFile");
