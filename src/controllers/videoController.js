import { ids } from "webpack";
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
      genres: genres.split(","),
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

  try {
    const video = await Video.findById({ _id: id });
    res.status(200).render("videoDetail.pug", { video });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findByIdAndDelete({ _id: id });
    return res.status(200).redorect("/");
  } catch (error) {
    console.log(error);
    return res.status(200).redirect("/");
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById({ _id: id });
    return res.render("videoEdit.pug", { video });
  } catch (error) {
    console.log(error);
    return res.status(400).redirect("/");
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description, genres },
  } = req;
  try {
    await Video.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        genres: genres.split(","),
      }
    );
    return res.status(200).redirect(`/videos/show/${id}`);
  } catch (error) {
    console.log(error);
    return res.status(400).redirect("/");
  }
};
