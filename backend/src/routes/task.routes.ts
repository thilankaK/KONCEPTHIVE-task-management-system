import { Router } from "express";

import {
  createTask,
  deleteTask,
  getAllTasks,
  getDashboardStats,
  getTaskById,
  updateTask,
} from "../controllers/task.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.post("/", createTask);

router.get("/", getAllTasks);

router.get("/dashboard", getDashboardStats);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;