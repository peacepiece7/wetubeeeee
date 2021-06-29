import User from "../models/WetubeUser.js";

export const login = (req, res) => {
  res.render("login.pug");
};

export const logout = (req, res) => {
  res.render("logout.pug");
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
