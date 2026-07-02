import { Router } from "express";

import {
  register,
  login
} from "../controllers/auth.controller.js";

import { validateRequest } from "../middlewares/validate.middleware.js";

import {
  validateRegisterData,
  validateLoginData
} from "../dto/auth.dto.js";

const router = Router();

router.post(
  "/register",
  validateRequest(validateRegisterData),
  register
);

router.post(
  "/login",
  validateRequest(validateLoginData),
  login
);

export default router;