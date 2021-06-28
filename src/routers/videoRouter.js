import express from "express";
import {
  deleteVideo,
  editVideo,
  getShowVideo,
  postShowVideo,
  getUploadVideo,
  postUploadVideo,
} from "../controllers/videoController";
import { uploadVideoFile } from "../middlewares";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .get(getUploadVideo)
  .post(uploadVideoFile, postUploadVideo);
videoRouter.route("/show/:id").get(getShowVideo).post(postShowVideo);
videoRouter.get("/delete/:id", deleteVideo);
videoRouter.get("/edit/:id", editVideo);

export default videoRouter;
