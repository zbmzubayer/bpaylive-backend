import { authService } from "@/modules/auth/auth.service";
import asyncHandler from "@/shared/async-handler";
import sendResponse from "@/shared/send-response";

const login = asyncHandler(async (req, res) => {
  const payload = req.body;
  const result = await authService.login(payload);
  sendResponse(res, { data: result });
});

export const authController = { login };
