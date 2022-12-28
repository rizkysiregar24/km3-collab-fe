import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email().required('No email provided'),
  password: yup.string().required('No password provided').min(3, 'Password min 6 chars')
});

export const registerSchema = yup.object({
  username: yup.string().required('Username is required').min(3, 'Username min 3 chars'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password min 6 chars'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], "Password doesn't match")
});
