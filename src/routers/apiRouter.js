import express from "express";
import {
  startGithubLogin,
  finishGithubLogin,
  getComments,
} from "../controllers/apiController.js";
import { onlyPublic } from "../middlewares.js";

const apiRouter = express.Router();

apiRouter.post("/:id/comments", getComments);

apiRouter.get("/github/start", onlyPublic, startGithubLogin);
apiRouter.get("/github/finish", onlyPublic, finishGithubLogin);

export default apiRouter;
