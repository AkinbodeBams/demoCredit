import { Router } from "express";
import accountController from "../controllers/accountController";

const router = Router();
router.post("/fund-account", accountController.fundAccount);
router.post("/withdraw-fund", accountController.withdrawFund);

export default router;
