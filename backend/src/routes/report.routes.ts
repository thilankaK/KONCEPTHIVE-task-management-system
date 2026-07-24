import { Router } from "express";

import { getTaskReport } from "../controllers/report.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/tasks", getTaskReport);

export default router;