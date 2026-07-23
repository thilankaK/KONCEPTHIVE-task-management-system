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
  req: Request,
  res: Response
) => {
  return res.status(200).json({
    success: true,
    message: "Get Task By ID Endpoint",
  });
};

export const updateTask = async (
  req: Request,
  res: Response
) => {
  return res.status(200).json({
    success: true,
    message: "Update Task Endpoint",
  });
};

export const deleteTask = async (
  req: Request,
  res: Response
) => {
  return res.status(200).json({
    success: true,
    message: "Delete Task Endpoint",
  });
};





