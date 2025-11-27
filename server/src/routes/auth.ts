import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../utils/validate";
import { body } from "express-validator";

const router = Router();

router.post(
  "/reg",
  validate([
    body("username").isString().notEmpty().isLength({ min: 2 }),
    body("password").isString().notEmpty().isLength({ min: 6 }),
  ]),
  AuthController.reg
);
router.post(
  "/login",
  validate([
    body("username").notEmpty().isLength({ min: 2 }),
    body("password").notEmpty().isLength({ min: 6 }),
  ]),
  AuthController.login
);
router.post(
  "/refresh",
  validate([body("token").notEmpty()]),
  AuthController.refresh
);

export default router;
