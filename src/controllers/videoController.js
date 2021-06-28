import Video from "../models/Video.js";

// UPLOAD
export const getUploadVideo = (req, res) => {
  res.render("upload.pug", { pageTitle: "UPLOAD" });
};
export const postUploadVideo = async (req, res) => {
  const {
    body: { title, description, genres },
    file: { path },
  } = req;
  try {
    await Video.create({
      fileUrl: path,
      title,
      description,
      genres,
    });
    return res.status(200).redirect("/");
  } catch (error) {
    console.log("false to make a video model");
    return req.status(400).redirect("/");
  }
};

// SHOW VIDEO
export const getShowVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log(id);
  try {
    const video = await Video.findById({ _id: id });
    res.status(200).render("videoDetail.pug", { video });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const postShowVideo = (req, res) => {
  res.end();
};
export const deleteVideo = (req, res) => {
  res.render("videoDelete.pug");
};
export const editVideo = (req, res) => {
  res.render("videoEdit.pug");
};
