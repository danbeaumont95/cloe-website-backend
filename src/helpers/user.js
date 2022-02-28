const { User } = require('../model/User');

const checkIfUserExists = async (email) => {
  const userFound = await User.findOne({ email });
  return userFound;
};

module.exports = {
  checkIfUserExists,
};
