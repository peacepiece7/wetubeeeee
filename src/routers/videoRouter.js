import express from "express";
import {
  deleteVideo,
  getEditVideo,
  getShowVideo,
  getUploadVideo,
  postEditVideo,
  postUploadVideo,
} from "../controllers/videoController";
import { uploadVideoFile } from "../middlewares";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .get(getUploadVideo)
  .post(uploadVideoFile, postUploadVideo);
videoRouter.get("/show/:id", getShowVideo);
videoRouter.get("/delete/:id", deleteVideo);
videoRouter.route("/edit/:id").get(getEditVideo).post(postEditVideo);

export default videoRouter;
