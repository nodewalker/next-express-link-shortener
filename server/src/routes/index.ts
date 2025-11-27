import { Router } from "express";
import LinkRouter from "./link";
import AuthRouter from "./auth";

const router = Router();

router.use("/link", LinkRouter);
router.use("/auth", AuthRouter);

export default router;
