import { Router } from "express";

import {
  createMyTask,
  getMyTasks,
  getMyTaskById,
  updateMyTask,
  deleteMyTask
} from "../controllers/task.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { validateTaskStatusFilter } from "../middlewares/task-filter.middleware.js";
import { validateTaskId } from "../middlewares/task-id.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

import {
  validateCreateTaskData,
  validateUpdateTaskData
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

router.get(
  "/:id",
  authenticate,
  validateTaskId,
  asyncHandler(getMyTaskById)
);

router.put(
  "/:id",
  authenticate,
  validateTaskId,
  validateRequest(validateUpdateTaskData),
  asyncHandler(updateMyTask)
);

router.delete(
  "/:id",
  authenticate,
  validateTaskId,
  asyncHandler(deleteMyTask)
);

export default router;