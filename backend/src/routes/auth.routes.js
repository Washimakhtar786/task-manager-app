import { Router } from "express";

import { register } from "../controllers/auth.controller.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { validateRegisterData } from "../dto/auth.dto.js";

const router = Router();

router.post(
  "/register",
  validateRequest(validateRegisterData),
  register
);

export default router;