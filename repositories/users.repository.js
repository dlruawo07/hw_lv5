const { Users } = require("../models");

class UsersRepository {
  createUser = async (nickname, password) => {
    await Users.create({ nickname, password }).catch((err) => {
      throw new Error();
    });
  };

  findUser = async (nickname) => {
    const user = await Users.findOne({ where: { nickname } }).catch((err) => {
      throw new Error();
    });

    return user;
  };
}

module.exports = UsersRepository;
