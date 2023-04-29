const jwt = require("jsonwebtoken");

const UsersRepository = require("../repositories/users.repository");
const myError = require("../utils/error");

class UsersService {
  usersRepository = new UsersRepository();

  signup = async (nickname, password, confirm) => {
    if (!/^[a-zA-Z0-9]{3,}/.test(nickname)) {
      throw myError(412, "닉네임의 형식이 일치하지 않습니다.");
    }

    const user = await this.usersRepository.findUser(nickname);
    if (user) {
      throw myError(412, "중복된 닉네임입니다.");
    }

    if (password.length < 4) {
      throw myError(412, "패스워드 형식이 일치하지 않습니다.");
    }

    if (password.includes(nickname)) {
      throw myError(412, "패스워드에 닉네임이 포함되어 있습니다.");
    }

    if (confirm !== password) {
      throw myError(412, "패스워드가 일치하지 않습니다.");
    }

    await this.usersRepository.createUser(nickname, password);
  };

  login = async (res, nickname, password) => {
    const user = await this.usersRepository.findUser(nickname);
    if (!user) {
      throw myError(412, "닉네임 또는 패스워드를 확인해주세요.");
    }

    if (password !== user.password) {
      throw myError(412, "닉네임 또는 패스워드를 확인해주세요.");
    }

    const token = jwt.sign({ userId: user.userId }, "hh99-secret-key", {
      expiresIn: "1h",
    });

    res.cookie("Authorization", `Bearer ${token}`);

    return token;
  };
}

module.exports = UsersService;
