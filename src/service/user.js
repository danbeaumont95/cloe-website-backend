const { omit } = require('lodash');
const { Session } = require('../model/Session');
const { User } = require('../model/User');
const { checkIfUserExists } = require('../helpers/user');

const validatePassword = async ({
  email,
  password,
}) => {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }
  return omit(user.toJSON(), 'password');
};

const createUserSession = async (userId, userAgent) => {
  const session = await Session.create({ user: userId, userAgent });
  return session.toJSON();
};

const createUser = async (body) => {
  try {
    const { email } = body;
    const userExists = await checkIfUserExists(email);
    if (userExists) {
      return {};
    }
    const user = await User.create(body);

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  validatePassword,
  createUserSession,
  createUser,
};
