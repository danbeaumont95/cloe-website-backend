const { validatePassword, createUserSession } = require('../service/user');
const { signJwt } = require('../utils/jwt.utils');

const createSessionHandler = async (req, res) => {
  console.log('create called');
  const respBody = {
    success: false,
    message: '',
    data: {},
  };

  const { body } = req;
  console.log(body, 'body');

  // Validate the user's password
  const user = await validatePassword(body);
  console.log(user, 'user');

  if (!user) {
    respBody.message = 'Invalid email or password';
    return res.status(200).json(respBody);
  }

  // create a session

  const session = await createUserSession(user._id, req.get('user-agent') || '');
  console.log(session, 'session');

  // create an access token

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: process.env.accessTokenTtl }, // 15 minutes
  );
  console.log(accessToken, 'accessToken');

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: process.env.refreshTokenTtl }, // 1 year
  );
  console.log(refreshToken, 'refreshToken');

  // return access & refresh tokens
  const { _id } = user;

  respBody.success = true;
  respBody.data = { accessToken, refreshToken, _id };
  return res.status(200).json(respBody);
};

module.exports = {
  createSessionHandler
};
