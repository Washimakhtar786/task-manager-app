import { getMyProfile } from "../services/profile.service.js";

export async function getProfile(req, res) {
  const profile = await getMyProfile(req.user.id);

  return res.status(200).json({
    success: true,
    message: "Profile retrieved successfully",
    data: profile
  });
}