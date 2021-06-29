import User from "../models/WetubeUser.js";
import bcrypt from "bcrypt";

export const getLogin = (req, res) => {
  res.render("login.pug");
};
export const postLogin = async (req, res) => {
  const { name, password } = req.body;
  const userDoc = await User.findOne({ name });
  bcrypt.compare(password, userDoc.password, (error, success) => {
    if (success) {
      req.session.user = userDoc;
      req.session.isLogined = true;
      return res.status(200).redirect("/");
    }
    return res.status(400).redirect("/users/login");
  });
};

export const logout = (req, res) => {
  req.session.user = null;
  req.session.isLogined = false;
  res.status(200).redirect("/");
};

export const getjoin = (req, res) => {
  res.render("join.pug");
};
export const postjoin = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  if (password !== password2) {
    console.log("password is not matched");
    return res.end();
  }
  try {
    await User.create({
      name,
      email,
      password,
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    console.log("query occured some error");
    return res.end();
  }
};

export const profile = (req, res) => {
  res.render("userProfile.pug");
};

export const editUser = (req, res) => {
  res.render("userEdit.pug");
};
