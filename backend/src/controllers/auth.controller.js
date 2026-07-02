import { registerUser } from "../services/auth.service.js";
import { asyncHandler } from "../utils/async-handler.js";
import { sendCreated } from "../utils/response.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.validatedData);

  return sendCreated(res, {
    message: "User registered successfully",
    data: user
  });
});