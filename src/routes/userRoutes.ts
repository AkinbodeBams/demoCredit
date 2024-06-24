import { Router } from "express";
import { userController } from "../controllers";

const router = Router();
router.post("/create", userController.createUser);

export default router;
