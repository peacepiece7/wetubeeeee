import "regenerator-runtime";
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
export const search = async (req, res) => {
  const { search } = req.query;
  try {
    const videos = await Video.find({
      title: { $regex: search, $options: "i" },
    });
    return res.status(200).render("search.pug", { videos });
  } catch (error) {
    console.log(error);
    return res.status(400).send("not found");
  }
};
