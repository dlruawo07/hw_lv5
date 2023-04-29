const { Users } = require("../models");

class UsersRepository {
  createUser = async (nickname, password) => {
    await Users.create({ nickname, password }).catch((err) => {
      throw new Error();
    });
  };

  findUser = async (value) => {
    if (Number.isInteger(value)) {
      const user = await Users.findOne({ where: { userId: value } }).catch(
        (err) => {
          throw new Error();
        }
      );
      return user;
    } else {
      const user = await Users.findOne({ where: { nickname: value } }).catch(
        (err) => {
          throw new Error();
        }
      );
      return user;
    }
  };
}

module.exports = UsersRepository;
