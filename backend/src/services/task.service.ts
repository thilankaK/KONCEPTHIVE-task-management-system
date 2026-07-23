import prisma from "../config/prisma";

interface CreateTaskData {
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  dueDate: Date;
  userId: string;
}

export const createTask = async (data: CreateTaskData) => {
  return prisma.task.create({
    data,
  });
};

export const getAllTasks = async (userId: string) => {
  return prisma.task.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getTaskById = async () => {
  return;
};

export const updateTask = async () => {
  return;
};

export const deleteTask = async () => {
  return;
};