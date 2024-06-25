import { Router } from "express";
import { accountController } from "../controllers";

const router = Router();
router.post("/fund-account", accountController.fundAccount);
router.post("/withdraw-fund", accountController.withdrawFund);

export default router;
