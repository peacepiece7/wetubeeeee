import express from "express";
import {
  editUser,
  getjoin,
  getLogin,
  logout,
  postjoin,
  postLogin,
  profile,
} from "../controllers/userController";
import { onlyPrivate, onlyPublic } from "../middlewares";

const userRouter = express.Router();

// LOGIN
userRouter.route("/login").get(onlyPublic, getLogin).post(postLogin);
userRouter.get("/logout", logout);

// JOIN
userRouter.route("/join").get(onlyPublic, getjoin).post(postjoin);

userRouter.get("/profile/:id", onlyPrivate, profile);
userRouter.get("/edit/:id", onlyPrivate, editUser);

export default userRouter;
