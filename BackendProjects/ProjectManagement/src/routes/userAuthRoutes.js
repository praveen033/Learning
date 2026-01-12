import { Router } from "express";
import { login, registerUser } from "../controllers/userAuthController.js";
import { userRegisterValidator } from "../validators/userRegisterValidation.js";
import { validate } from "../middlewares/validatior.middleware.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);

router.route("/login").post(login);

export default router;
