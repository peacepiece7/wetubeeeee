import express from "express";
import { root, search } from "../controllers/rootController";

const rootRouter = express.Router();

rootRouter.get("/", root);
rootRouter.get("/search", search);

export default rootRouter;
