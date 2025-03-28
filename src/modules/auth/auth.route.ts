import { Router } from "express";

import validateRequest from "@/middleware/validate-request.middleware";
import { authController } from "@/modules/auth/auth.controller";
import { authZodSchema } from "./auth.dto";

const router: Router = Router();

router.post(
  "/login",
  validateRequest(authZodSchema.login),
  authController.login
);
// router.get("/user-profile", authGuard(Role.Admin, Role.Seller, Role.Customer), authController.getUserByToken);
// router.post(
//   '/access-token',
//   validateRequest(authValidation.refreshTokenZodSchema),
//   authController.getAccessToken
// );
// router.patch(
//   '/change-password',
//   auth(UserRoles.SuperAdmin, UserRoles.Admin, UserRoles.Faculty, UserRoles.Student),
//   validateRequest(authValidation.changePasswordZodSchema),
//   authController.changePassword
// );

export const authRouter = router;
