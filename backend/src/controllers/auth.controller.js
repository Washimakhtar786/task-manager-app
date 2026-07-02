import {
  registerUser,
  loginUser
} from "../services/auth.service.js";

import { asyncHandler } from "../utils/async-handler.js";

import {
  sendCreated,
  sendSuccess
} from "../utils/response.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.validatedData);

  return sendCreated(res, {
    message: "User registered successfully",
    data: user
  });
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.validatedData);

  return sendSuccess(res, {
    message: "Login successful",
    data: result
  });
});