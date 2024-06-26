import { Router } from "express";
import { accountController } from "../controllers";
import { authToken } from "../lib/middlewares";

const router = Router();
router.post("/fund-account", authToken, accountController.fundAccount);
router.post("/withdraw-fund", authToken, accountController.withdrawFund);
router.post("/transfer", accountController.withdrawFund);

export default router;
