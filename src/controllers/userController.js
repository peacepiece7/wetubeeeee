import User from "../models/User.js";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

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
      req.flash("info", "로그인 되었습니다.");
      return res.status(200).redirect("/");
    }
    return res.status(400).redirect("/users/login");
  });
};

export const logout = (req, res) => {
  req.session.destroy();
  req.flash("info", "로그아웃 되었습니다.");
  res.status(200).redirect("/");
};

export const getjoin = (req, res) => {
  res.render("join.pug");
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
    console.log("해당 이매일은 소셜 로그인으로 가입되어 있습니다.");
    return res.redirect("/users/join");
  }
  if (user) {
    console.log("이미 사용중인 아이디 입니다.");
    return res.redirect("/users/join");
  }
  try {
    await User.create({
      name,
      email,
      password,
    });
    req.flash("error", "가입되었습니다.");
    return res.redirect("/");
  } catch (error) {
    return res.redirect("/users/join");
  }
};

export const profile = (req, res) => {
  res.render("userProfile.pug");
};

export const editUser = (req, res) => {
  res.render("userEdit.pug");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GIT_ID,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GIT_ID,
    client_secret: process.env.GIT_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    let email = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    // email is not existing
    if (!email) {
      console.log("email is not existing");
      return res.redirect("/users/login");
    }
    // user data is exsisting
    let user = await User.findOne({ email: email.email });
    if (user) {
      req.session.user = user;
      req.session.isLogined = true;
      req.flash("info", "로그인 되었습니다.");
      return res.redirect("/users/login");
    } else {
      const user = await User.create({
        name: userData.login,
        email: email.email,
        password: "",
        socialLogin: true,
      });
      req.session.user = user;
      req.session.isLogined = true;
      req.flash("info", "로그인 되었습니다.");
      return res.redirect("/users/login");
    }
  } else {
    console.log("cant find access token");
    return res.redirect("/users/login");
  }
};
