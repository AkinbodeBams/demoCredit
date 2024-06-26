import { Router } from "express";
import { authController } from "../controllers";

const router = Router();
router.get("/generate-token", authController.regenerateToken);

export default router;
