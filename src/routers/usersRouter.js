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

const userRouter = express.Router();

// LOGIN
userRouter.route("/login").get(getLogin).post(postLogin);
userRouter.get("/logout", logout);

// JOIN
userRouter.route("/join").get(getjoin).post(postjoin);

userRouter.get("/profile/:id", profile);
userRouter.get("/edit/:id", editUser);

export default userRouter;
