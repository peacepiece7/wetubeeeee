import "regenerator-runtime";
import Video from "../models/Video.js";

export const getRoot = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.status(200).render("home.pug", { pageTitle: "HOME", videos });
  } catch (error) {
    req.flash("error", "비디오를 찾을 수 없습니다.");
    return res.status(400).redirect("/");
  }
};
export const search = async (req, res) => {
  const { search } = req.query;
  try {
    const videos = await Video.find({
      title: { $regex: search, $options: "i" },
    });
    return res
      .status(200)
      .render("search.pug", { pageTitle: "SEARCH", videos });
  } catch (error) {
    console.log(error);
    return res.send("검색 결과과 없습니다.");
  }
};
