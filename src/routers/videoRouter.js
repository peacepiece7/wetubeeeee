import express from "express";
import {
  deleteVideo,
  editVideo,
  showVideo,
  uploadVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", uploadVideo);
videoRouter.get("/show/:id", showVideo);
videoRouter.get("/delete/:id", deleteVideo);
videoRouter.get("/edit/:id", editVideo);

export default videoRouter;
