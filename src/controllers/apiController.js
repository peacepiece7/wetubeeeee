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
      req.flash("error", "이메일을 찾을 수 없습니다.");
      return res.redirect("/users/login");
    }
    // user data is exsisting
    let user = await User.findOne({ email: email.email });
    if (user) {
      req.session.user = user;
      req.session.isLogined = true;
      req.flash("info", "로그인 되었습니다.");
      return res.status(200).redirect("/");
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
      return res.status(200).redirect("/");
    }
  } else {
    console.log("cant find access token");
    return res.status(400).send("ERROR");
  }
};
