import Video from "../models/Video.js";

// UPLOAD
export const getUploadVideo = (req, res) => {
  res.render("upload.pug", { pageTitle: "UPLOAD" });
};
export const postUploadVideo = async (req, res) => {
  // fileUrl: req.file ? req.file.location : fileUrl,
  console.log(req);
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
    req.flash("error", "비디오를 만드는데 실패했습니다.");
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
    req.flash("error", "접근할 수 없는 비디오입니다.");
    res.sendStatus(404);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findByIdAndDelete({ _id: id });
    req.flash("info", "비디오가 삭제 되었습니다.");
    return res.status(200).redirect("/");
  } catch (error) {
    req.flash("error", "비디오를 지울 수 없습니다.");
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
    req.flash("error", "접근할 수 없는 비디오입니다.");
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
    req.flash("error", "비디오 편집을 실패했습니다.");
    return res.status(400).redirect(`/videos/show/${id}`);
  }
};
