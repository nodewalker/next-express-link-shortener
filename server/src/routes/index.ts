import { Router } from "express";
import LinkRouter from "./link";
import AuthRouter from "./auth";
import UserRouter from "./user";

const router = Router();

router.use("/link", LinkRouter);
router.use("/auth", AuthRouter);
router.use("/user", UserRouter);

export default router;
