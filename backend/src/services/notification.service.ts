import prisma from "../config/prisma";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const getStartOfDay = (date: Date) => {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
};

export const generateTaskNotifications = async (
  userId: string
) => {
  const now = getStartOfDay(new Date());

  const tasks = await prisma.task.findMany({
    where: {
      userId,
      status: {
        not: "COMPLETED",
      },
    },
  });

  for (const task of tasks) {
    const dueDate = getStartOfDay(task.dueDate);

    const daysRemaining = Math.ceil(
      (dueDate.getTime() - now.getTime()) / DAY_IN_MS
    );

    let type:
      | "DUE_SOON"
      | "DUE_TODAY"
      | "OVERDUE"
      | null = null;

    let title = "";
    let message = "";

    if (daysRemaining < 0) {
      type = "OVERDUE";
      title = "Task overdue";
      message = `"${task.title}" is overdue.`;
    } else if (daysRemaining === 0) {
      type = "DUE_TODAY";
      title = "Task due today";
      message = `"${task.title}" is due today.`;
    } else if (daysRemaining <= 3) {
      type = "DUE_SOON";
      title = "Task due soon";
      message = `"${task.title}" is due in ${daysRemaining} day${
        daysRemaining === 1 ? "" : "s"
      }.`;
    }

    if (!type) {
      continue;
    }

    await prisma.notification.upsert({
      where: {
        taskId_type: {
          taskId: task.id,
          type,
        },
      },
      update: {
        title,
        message,
      },
      create: {
        title,
        message,
        type,
        taskId: task.id,
        userId,
      },
    });
  }

  return prisma.notification.findMany({
    where: {
      userId,
    },
    include: {
      task: {
        select: {
          id: true,
          title: true,
          dueDate: true,
          status: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const markNotificationAsRead = async (
  notificationId: string,
  userId: string
) => {
  const notification =
    await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId,
      },
    });

  if (!notification) {
    return null;
  }

  return prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      isRead: true,
    },
  });
};

export const markAllNotificationsAsRead = async (
  userId: string
) => {
  return prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
};