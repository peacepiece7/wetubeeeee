import express from "express";
import {
  editUser,
  getjoin,
  login,
  logout,
  postjoin,
  profile,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/login", login);
userRouter.get("/logout", logout);

// JOIN
userRouter.route("/join").get(getjoin).post(postjoin);

userRouter.get("/profile/:id", profile);
userRouter.get("/edit/:id", editUser);

export default userRouter;
