export const login = (req, res) => {
  res.render("login.pug");
};

export const logout = (req, res) => {
  res.render("logout.pug");
};

export const join = (req, res) => {
  res.render("join.pug");
};

export const profile = (req, res) => {
  res.render("userProfile.pug");
};

export const editUser = (req, res) => {
  res.render("userEdit.pug");
};
