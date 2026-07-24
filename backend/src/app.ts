import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import notificationRoutes from "./routes/notification.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Task Management API is running 🚀"
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/notifications", notificationRoutes);


export default app;