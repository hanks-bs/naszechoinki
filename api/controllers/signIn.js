import SignInUserService from "./../services/signInService.js";

class SignIn {
  async Authenticate(req, res, next) {
    const responseToken = req.cookies.jid;
    if (responseToken) {
      const response = await SignInUserService.Authenticate(responseToken);
      if (response.errors) return res.json(response);
      const { accessToken, refreshToken, toRefresh } = response;
      if (refreshToken) {
        res.cookie("jid", refreshToken, {
          SameSite: true,
        });
      }

      res.setHeader("Authorization", `Bearer ${accessToken}`);

      return res.json({
        headers: req.headers.authorization,
        refresh: toRefresh,
      });
    }
    return res.status(403).json("Forbidden");
  }

  async SignInUser(req, res, next) {
    try {
      const response = await SignInUserService.SignInUser(req.body);
      if (response.errors) return res.json(response);
      const { accessToken, refreshToken } = response;
      res.setHeader("Authorization", `Bearer ${accessToken}`);
      res.cookie("jid", refreshToken, {
        SameSite: true,
      });
      res.status(201).json(response);
    } catch (err) {
      console.error(err);
      return res.status(500).json("Something went wrong");
    }
  }
}
export default new SignIn();
