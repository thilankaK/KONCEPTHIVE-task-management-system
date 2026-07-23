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

export const getTaskById = async (
  taskId: string,
  userId: string
) => {
  return prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });
};

interface UpdateTaskData {
  title?: string;
  description?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  dueDate?: Date;
}

export const updateTask = async (
  taskId: string,
  userId: string,
  data: UpdateTaskData
) => {
  const existingTask = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!existingTask) {
    return null;
  }

  return prisma.task.update({
    where: {
      id: taskId,
    },
    data,
  });
};

export const deleteTask = async (
  taskId: string,
  userId: string
) => {
  const existingTask = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!existingTask) {
    return null;
  }

  return prisma.task.delete({
    where: {
      id: taskId,
    },
  });
};