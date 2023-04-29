const UsersService = require("../services/users.service");

class UsersController {
  usersService = new UsersService();

  signup = async (req, res, next) => {
    try {
      if (Object.keys(req.body).length !== 3) {
        throw Error();
      }

      const { nickname, password, confirm } = req.body;

      await this.usersService.signup(nickname, password, confirm);

      res.status(201).json({ message: "회원가입이 완료됐습니다." });
    } catch (err) {
      err.failedApi = "회원가입";
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      if (Object.keys(req.body).length !== 2) {
        throw Error();
      }

      const { nickname, password } = req.body;

      const token = await this.usersService.login(res, nickname, password);

      res.status(200).json({ token });
    } catch (err) {
      err.failedApi = "로그인";
      next(err);
    }
  };
}

module.exports = UsersController;
