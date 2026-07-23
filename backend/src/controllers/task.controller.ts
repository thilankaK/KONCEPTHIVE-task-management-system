import { Request, Response } from "express";



import { AuthRequest } from "../types/auth.types";

import * as taskService from "../services/task.service";


export const createTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      dueDate,
    } = req.body;

    if (!title || !priority || !status || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const task = await taskService.createTask({
      title,
      description,
      priority,
      status,
      dueDate: new Date(dueDate),
      userId: req.userId!,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getAllTasks = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : undefined;

    const status =
      typeof req.query.status === "string"
        ? req.query.status.toUpperCase()
        : undefined;

    const priority =
      typeof req.query.priority === "string"
        ? req.query.priority.toUpperCase()
        : undefined;

    const sortBy =
      typeof req.query.sortBy === "string"
        ? req.query.sortBy
        : "newest";

    const validStatuses = [
      "PENDING",
      "IN_PROGRESS",
      "COMPLETED",
    ];

    const validPriorities = [
      "LOW",
      "MEDIUM",
      "HIGH",
    ];

    const validSortOptions = [
      "newest",
      "oldest",
      "dueDate",
    ];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status filter.",
      });
    }

    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority filter.",
      });
    }

    if (!validSortOptions.includes(sortBy)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort option.",
      });
    }

    const tasks = await taskService.getAllTasks({
      userId: req.userId!,
      search,
      status: status as
        | "PENDING"
        | "IN_PROGRESS"
        | "COMPLETED"
        | undefined,
      priority: priority as
        | "LOW"
        | "MEDIUM"
        | "HIGH"
        | undefined,
      sortBy: sortBy as
        | "newest"
        | "oldest"
        | "dueDate",
    });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      filters: {
        search: search ?? null,
        status: status ?? null,
        priority: priority ?? null,
        sortBy,
      },
      data: tasks,
    });
  } catch (error) {
    console.error("Get tasks error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getTaskById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const taskId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required.",
      });
    }

    const task = await taskService.getTaskById(
      taskId,
      req.userId!
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error("Get task error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const taskId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required.",
      });
    }

    const {
      title,
      description,
      priority,
      status,
      dueDate,
    } = req.body;

    if (
      !title &&
      description === undefined &&
      !priority &&
      !status &&
      !dueDate
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update.",
      });
    }

    const updatedTask = await taskService.updateTask(
      taskId,
      req.userId!,
      {
        title,
        description,
        priority,
        status,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: updatedTask,
    });
  } catch (error) {
    console.error("Update task error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const taskId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required.",
      });
    }

    const deletedTask = await taskService.deleteTask(
      taskId,
      req.userId!
    );

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    console.error("Delete task error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};



export const getDashboardStats = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const stats = await taskService.getDashboardStats(
      req.userId!
    );

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};





