import Video from "../models/Video.js";

export const getRoot = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.status(200).render("home.pug", { videos });
  } catch (error) {
    console.log(error);
    return res.status(400).redirect("/");
  }
};

export const search = (req, res) => {
  res.render("search.pug");
};
