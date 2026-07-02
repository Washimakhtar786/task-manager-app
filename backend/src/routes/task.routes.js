import { Router } from "express";

import {
  createMyTask,
  getMyTasks
} from "../controllers/task.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { validateTaskStatusFilter } from "../middlewares/task-filter.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

import {
  validateCreateTaskData
} from "../dto/task.dto.js";

import { asyncHandler } from "../utils/async-handler.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validateRequest(validateCreateTaskData),
  asyncHandler(createMyTask)
);

router.get(
  "/",
  authenticate,
  validateTaskStatusFilter,
  asyncHandler(getMyTasks)
);

export default router;