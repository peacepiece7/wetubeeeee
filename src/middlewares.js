import multer from "multer";

export const localMiddleware = (req, res, next) => {
  res.locals.isLogined = req.session.isLogined;
  res.locals.siteName = "wetube";
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/videos/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });
export const uploadVideoFile = upload.single("videoFile");
