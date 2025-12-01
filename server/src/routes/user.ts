import { Router } from "express";
import { AuthGuard } from "../middlewares/AuthGuard";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.get("/profile", AuthGuard, UserController.profile);

export default router;
