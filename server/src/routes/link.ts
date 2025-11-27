import { Router } from "express";
import { LinkController } from "../controllers/link.controller";
import { AuthGuard } from "../middlewares/AuthGuard";
import { validate } from "../utils/validate";
import { body } from "express-validator";

const router = Router();

router.post(
  "/",
  validate([body("longLink").notEmpty().isURL()]),
  AuthGuard,
  LinkController.create
);
router.get("/", AuthGuard, LinkController.getAll);
router.delete(
  "/",
  validate([body("linkId").notEmpty()]),
  AuthGuard,
  LinkController.remove
);

export default router;
