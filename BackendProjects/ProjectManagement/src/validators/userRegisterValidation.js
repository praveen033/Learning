import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage(`Email is required`)
      .isEmail()
      .withMessage(`Email is invalid`),
    body("password")
      .trim()
      .notEmpty()
      .withMessage(`Password is required`)
      .isLength({ min: 8 })
      .withMessage(`Password must be have atleast 8 characters`),
    body("userName")
      .trim()
      .optional()
      .isLowercase()
      .withMessage(`User name must be in lowar case`)
      .isLength({ min: 3 })
      .withMessage(`User Name must be atleast 3 characters`),
  ];
};

export { userRegisterValidator };
