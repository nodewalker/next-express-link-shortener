import { Router } from "express";
import TodoRouter from "./todo";

const router = Router();

router.use("/todo", TodoRouter);

export default router;
