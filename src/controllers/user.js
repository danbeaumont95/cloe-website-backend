const { omit } = require('lodash');
const { createUser } = require('../service/user');

const createUserHandler = async (req, res) => {
  const respBody = {
    success: false,
    message: '',
    data: {},
  };
  try {
    if (!req.headers.apikey || req.headers.apikey !== process.env.createUserApiKey) {
      respBody.message = '[BadRequest] Unauthorized to create new user';
      return res.status(200).json(respBody);
    }
    const { body } = req;
    const user = await createUser(body);

    if (Object.keys(user).length === 0) {
      respBody.message = '[BadRequest] User already exists';
      respBody.data = {};
      return res.status(200).json(respBody);
    }
    if (user.errors) {
      respBody.message = '[BadRequest] Invalid Input';
      const { message } = user;
      respBody.data = { error: message };
      return res.status(200).json(respBody);
    }

    respBody.success = true;
    respBody.data = omit(user.toJSON(), 'password');
  } catch (error) {
    return res.send({ error: error.message });
  }
  return res.status(200).json(respBody);
};

module.exports = {
  createUserHandler,
};
