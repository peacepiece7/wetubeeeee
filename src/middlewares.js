export const localMiddleWare = (req, res, next) => {
  res.locals.siteName = "wetube";
  next();
};
