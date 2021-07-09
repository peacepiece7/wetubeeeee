import Video from "../models/Video.js";

// UPLOAD
export const getUploadVideo = (req, res) => {
  res.render("upload.pug", { pageTitle: "UPLOAD" });
};
export const postUploadVideo = async (req, res) => {
  // fileUrl: req.file ? req.file.location : fileUrl,
  // 삼항 연산자로 location을 고치거나, 비디오를 업로드할 땐 heroku에서 할 것.
  const {
    body: { title, description, genres },
    file: { location },
  } = req;
  try {
    await Video.create({
      fileUrl: req.file ? location : fileUrl,
      title,
      description,
      genres: genres.split(","),
      creator: req.session.user._id,
    });
    return res.status(200).redirect("/");
  } catch (error) {
    req.flash("error", "비디오를 만드는데 실패했습니다.");
    return res.status(400).redirect("/");
  }
};

// SHOW VIDEO
export const getShowVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  const { user } = req.session;
  let creator;
  if (!user) {
    creator = null;
  } else {
    creator = user;
  }
  try {
    const video = await Video.findById({ _id: id });
    res
      .status(200)
      .render("videoDetail.pug", { pageTitle: video.title, video, creator });
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
    return res.status(400).redirect("/");
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById({ _id: id });
    return res.status(200).render("videoEdit.pug", {
      pageTitle: `EDIT : ${video.title}`,
      video,
    });
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
