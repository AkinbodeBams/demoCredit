import { Router } from "express";
import accountController from "../controllers/accountController";

const router = Router();
router.post("/fund", accountController.fundAccount);

export default router;
