import express from "express";
import { getRoot, search, errorPage } from "../controllers/rootController";

const rootRouter = express.Router();

rootRouter.route("/").get(getRoot);
rootRouter.get("/search", search);

export default rootRouter;
