const { Users } = require("../models");
const myError = require("../utils/error");

class UsersRepository {
  createUser = async (nickname, password) => {
    await Users.create({ nickname, password }).catch((err) => {
      throw myError(400, "요청한 데이터 형식이 올바르지 않습니다.");
    });
  };

  findUser = async (nickname) => {
    const user = await Users.findOne({ where: { nickname } }).catch((err) => {
      throw myError(400, "로그인에 실패했습니다.");
    });

    return user;
  };
}

module.exports = UsersRepository;
