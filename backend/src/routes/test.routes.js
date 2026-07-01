import { Router } from "express";

import {
  validateRegisterData,
  validateLoginData,
} from "../dto/auth.dto.js";

import {
  validateCreateTaskData,
  validateUpdateTaskData,
} from "../dto/task.dto.js";

import { validateRequest } from "../middlewares/validate.middleware.js";
import { sendSuccess } from "../utils/response.js";

const router = Router();

router.post(
  "/register-validation",
  validateRequest(validateRegisterData),
  (req, res) => {
    return sendSuccess(res, {
      message: "Registration data is valid",
      data: req.validatedData,
    });
  }
);

router.post(
  "/login-validation",
  validateRequest(validateLoginData),
  (req, res) => {
    return sendSuccess(res, {
      message: "Login data is valid",
      data: req.validatedData,
    });
  }
);

router.post(
  "/task-create-validation",
  validateRequest(validateCreateTaskData),
  (req, res) => {
    return sendSuccess(res, {
      message: "Task creation data is valid",
      data: req.validatedData,
    });
  }
);

router.put(
  "/task-update-validation",
  validateRequest(validateUpdateTaskData),
  (req, res) => {
    return sendSuccess(res, {
      message: "Task update data is valid",
      data: req.validatedData,
    });
  }
);

export default router;