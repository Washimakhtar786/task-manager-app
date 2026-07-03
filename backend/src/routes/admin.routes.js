import { Router } from "express";

import {
  listUsers,
  listTasks,
  getStatistics,
  changeUserStatus
} from "../controllers/admin.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validateUserId } from "../middlewares/user-id.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

import { validateUserStatusData } from "../dto/admin.dto.js";

import { asyncHandler } from "../utils/async-handler.js";

const router = Router();

router.use(
  authenticate,
  authorizeRoles("ADMIN")
);

router.get(
  "/users",
  asyncHandler(listUsers)
);

router.get(
  "/tasks",
  asyncHandler(listTasks)
);

router.get(
  "/statistics",
  asyncHandler(getStatistics)
);

router.patch(
  "/users/:id/status",
  validateUserId,
  validateRequest(validateUserStatusData),
  asyncHandler(changeUserStatus)
);

export default router;