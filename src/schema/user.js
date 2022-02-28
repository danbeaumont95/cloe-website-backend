const {
  object, string, ref,
} = require('yup');

const createUserSchema = object({
  body: object({
    email: string()
      .email('Must be a valid email')
      .required('Email is required'),
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    password: string()
      .required('Password is required')
      .min(6, 'Password is too short - Should be 6 characters minimum'),
    passwordConfirmation: string().oneOf(
      [ref('password'), null],
      'Passwords must match',
    ),
  }),
});

const createUserSessionSchema = object({
  body: object({
    email: string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: string()
      .required('Password is required')
      .min(6, 'Password is too short - Should be 6 characters minimum')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters'),
  }),
});

module.exports = {
  createUserSchema,
  createUserSessionSchema,
};
