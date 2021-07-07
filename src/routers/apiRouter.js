import express from "express";
import {
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/apiController.js";
import { onlyPublic } from "../middlewares.js";

const apiRouter = express.Router();

apiRouter.get("/github/start", onlyPublic, startGithubLogin);
apiRouter.get("/github/finish", onlyPublic, finishGithubLogin);

export default apiRouter;
