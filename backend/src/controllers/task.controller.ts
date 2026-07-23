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
    const tasks = await taskService.getAllTasks(req.userId!);

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error(error);

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





