const UsersService = require("../services/users.service");

const myError = require("../utils/error");

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
      if (!err.statusCode) {
        res
          .status(400)
          .json({ errorMessage: "요청한 데이터 형식이 올바르지 않습니다." });
      } else {
        res.status(err.statusCode).json({ errorMessage: err.message });
      }
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
      if (!err.statusCode) {
        res.status(400).json({ errorMessage: "로그인에 실패했습니다." });
      } else {
        res.status(err.statusCode).json({ errorMessage: err.message });
      }
    }
  };
}

module.exports = UsersController;
