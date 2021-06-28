import express from "express";
import {
  editUser,
  join,
  login,
  logout,
  profile,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/login", login);
userRouter.get("/logout", logout);
userRouter.get("/join", join);
userRouter.get("/profile/:id", profile);
userRouter.get("/edit/:id", editUser);

export default userRouter;
