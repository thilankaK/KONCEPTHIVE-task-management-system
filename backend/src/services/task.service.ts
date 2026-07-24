import prisma from "../config/prisma";

interface CreateTaskData {
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  dueDate: Date;
  userId: string;
}

interface GetTasksOptions {
  userId: string;
  search?: string;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  sortBy?: "newest" | "oldest" | "dueDate";
}

export const createTask = async (data: CreateTaskData) => {
  return prisma.task.create({
    data,
  });
};

export const getAllTasks = async ({
  userId,
  search,
  status,
  priority,
  sortBy = "newest",
}: GetTasksOptions) => {
  const orderBy =
    sortBy === "oldest"
      ? { createdAt: "asc" as const }
      : sortBy === "dueDate"
      ? { dueDate: "asc" as const }
      : { createdAt: "desc" as const };

  return prisma.task.findMany({
    where: {
      userId,

      ...(search && {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }),

      ...(status && {
        status,
      }),

      ...(priority && {
        priority,
      }),
    },

    orderBy,
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

  let completedAt = existingTask.completedAt;

  if (
    data.status === "COMPLETED" &&
    existingTask.status !== "COMPLETED"
  ) {
    completedAt = new Date();
  }

  if (
    data.status &&
    data.status !== "COMPLETED"
  ) {
    completedAt = null;
  }

  return prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      ...data,
      completedAt,
    },
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

export const getDashboardStats = async (userId: string) => {
  const [
    totalTasks,
    pendingTasks,
    inProgressTasks,
    completedTasks,
    overdueTasks,
  ] = await Promise.all([
    prisma.task.count({
      where: { userId },
    }),

    prisma.task.count({
      where: {
        userId,
        status: "PENDING",
      },
    }),

    prisma.task.count({
      where: {
        userId,
        status: "IN_PROGRESS",
      },
    }),

    prisma.task.count({
      where: {
        userId,
        status: "COMPLETED",
      },
    }),

    prisma.task.count({
      where: {
        userId,
        dueDate: {
          lt: new Date(),
        },
        NOT: {
          status: "COMPLETED",
        },
      },
    }),
  ]);

  return {
    totalTasks,
    pendingTasks,
    inProgressTasks,
    completedTasks,
    overdueTasks,
  };
};