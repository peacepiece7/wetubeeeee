import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getLogin = (req, res) => {
  res.render("login.pug", { pageTitle: "LOGIN" });
};
export const postLogin = async (req, res) => {
  const { name, password } = req.body;
  const userDoc = await User.findOne({ name });
  if (!userDoc) {
    req.flash("error", "아이디가 존재하지 않습니다.");
    return res.redirect("/users/login");
  }
  bcrypt.compare(password, userDoc.password, (error, success) => {
    if (success) {
      req.session.user = userDoc;
      req.session.isLogined = true;
      req.flash("info", "로그인 되었습니다.");
      return res.redirect("/");
    } else {
      req.flash("error", "비밀번호 혹은 아이디가 일치하지 않습니다.");
      return res.status(400).redirect("/users/login");
    }
  });
};

export const logout = (req, res) => {
  req.session.destroy();
  res.status(200).redirect("/");
};

export const getjoin = (req, res) => {
  res.render("join.pug", { pageTitle: "JOIN" });
};
export const postjoin = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  if (password !== password2) {
    req.flash("error", "패스워드가 일치하지 않습니다.");
    return res.redirect("/users/join");
  }
  // const user = await User.find({ $or: [{ name }, { email }] });
  const user = await User.findOne({ name });
  const userEmail = await User.findOne({ email });
  if (userEmail) {
    req.flash("error", "해당 이매일은 가입되어 있습니다.");
    return res.redirect("/users/join");
  }
  if (user) {
    req.flash("error", "이미 사용중인 아이디 입니다.");
    return res.redirect("/users/join");
  }
  try {
    await User.create({
      name,
      email,
      password,
    });
    req.flash("info", "가입되었습니다.");
    return res.status(200).redirect("/");
  } catch (error) {
    console.log(error);
    req.flash("error", "가입에 실패했습니다.");
    return res.status(400).redirect("/");
  }
};

export const profile = (req, res) => {
  res.render("userProfile.pug", { pageTitle: "PROFILE" });
};

export const editUser = (req, res) => {
  res.render("userEdit.pug", { pageTitle: "EDIT USER" });
};
