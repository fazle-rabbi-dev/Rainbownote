import * as yup from 'yup';

export const signInSchema= yup.object({
  email: yup.string().email("Email must be a valid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 digit").required("Password is required"),
});

export const signUpSchema= yup.object({
  name: yup.string().min(3, "Name must be at least 3 digit").required("Email is required"),
  email: yup.string().email("Email must be a valid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 digit").required("Password is required"),
});


/*
name: string().required(),
  age: number().required().positive().integer(),
  website: string().url().nullable(),
  createdOn: date().default(() => new Date()),
*/