export const uploadVideo = (req, res) => {
  res.render("upload.pug", { pageTitle: "UPLOAD" });
};
export const showVideo = (req, res) => {
  res.render("videoDetail.pug");
};
export const deleteVideo = (req, res) => {
  res.render("videoDelete.pug");
};
export const editVideo = (req, res) => {
  res.render("videoEdit.pug");
};
