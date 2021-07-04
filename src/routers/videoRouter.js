import express from "express";
import {
  deleteVideo,
  getEditVideo,
  getShowVideo,
  getUploadVideo,
  postEditVideo,
  postUploadVideo,
} from "../controllers/videoController";
import { onlyPrivate, uploadVideoFile } from "../middlewares";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .get(onlyPrivate, getUploadVideo)
  .post(uploadVideoFile, postUploadVideo);
videoRouter.get("/show/:id", getShowVideo);
videoRouter.get("/delete/:id", onlyPrivate, deleteVideo);
videoRouter
  .route("/edit/:id")
  .get(onlyPrivate, getEditVideo)
  .post(postEditVideo);

export default videoRouter;
