import { Router } from "express";

import {
  getProfile,
  login,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", login);
router.get("/profile", authenticate, getProfile);

export default router;