import { Router } from "express";

import {
  register,
  login
} from "../controllers/auth.controller.js";

import { getProfile } from "../controllers/profile.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

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

router.get(
  "/me",
  authenticate,
  asyncHandler(getProfile)
);

export default router;