import { validationResult } from "express-validator";
import { api_errors } from "../utils/api_errors.js";

export const validate = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  error.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
  return next(
    new api_errors(422, "Recieved data is not valid", extractedErrors),
  );
  // throw new api_errors(422, "Recieved data is not valid", extractedErrors);
};
