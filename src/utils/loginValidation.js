import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email address'),
  password: yup.string().url('Must be a valid url'),
});

export default loginSchema;
