import prisma from "../config/prisma";

export type ReportPeriod =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "custom";

interface ReportOptions {
  userId: string;
  period: ReportPeriod;
  startDate?: string;
  endDate?: string;
}

const startOfDay = (date: Date) => {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
};

const endOfDay = (date: Date) => {
  const value = new Date(date);
  value.setHours(23, 59, 59, 999);
  return value;
};

const getDateRange = (
  period: ReportPeriod,
  customStartDate?: string,
  customEndDate?: string
) => {
  const now = new Date();

  if (period === "daily") {
    return {
      startDate: startOfDay(now),
      endDate: endOfDay(now),
    };
  }

  if (period === "weekly") {
    const startDate = startOfDay(now);
    const day = startDate.getDay();

    const differenceFromMonday =
      day === 0 ? 6 : day - 1;

    startDate.setDate(
      startDate.getDate() - differenceFromMonday
    );

    const endDate = endOfDay(new Date(startDate));
    endDate.setDate(endDate.getDate() + 6);

    return {
      startDate,
      endDate,
    };
  }

  if (period === "monthly") {
    return {
      startDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
        0,
        0,
        0,
        0
      ),
      endDate: new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      ),
    };
  }

  if (period === "yearly") {
    return {
      startDate: new Date(
        now.getFullYear(),
        0,
        1,
        0,
        0,
        0,
        0
      ),
      endDate: new Date(
        now.getFullYear(),
        11,
        31,
        23,
        59,
        59,
        999
      ),
    };
  }

  if (!customStartDate || !customEndDate) {
    throw new Error(
      "Start date and end date are required for a custom report."
    );
  }

  const startDate = startOfDay(
    new Date(customStartDate)
  );

  const endDate = endOfDay(
    new Date(customEndDate)
  );

  if (
    Number.isNaN(startDate.getTime()) ||
    Number.isNaN(endDate.getTime())
  ) {
    throw new Error("Invalid custom date range.");
  }

  if (startDate > endDate) {
    throw new Error(
      "Start date cannot be later than end date."
    );
  }

  return {
    startDate,
    endDate,
  };
};

const formatDateKey = (date: Date) =>
  date.toISOString().split("T")[0];

export const generateTaskReport = async ({
  userId,
  period,
  startDate: customStartDate,
  endDate: customEndDate,
}: ReportOptions) => {
  const { startDate, endDate } = getDateRange(
    period,
    customStartDate,
    customEndDate
  );

  /*
   * The period filters tasks using their createdAt date.
   * Due dates are still included in the report and used
   * for overdue and deadline calculations.
   */
  const tasks = await prisma.task.findMany({
    where: {
      userId,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: [
      {
        dueDate: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  const now = new Date();

  const pendingTasks = tasks.filter(
    (task) => task.status === "PENDING"
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  );

  const overdueTasks = tasks.filter(
    (task) =>
      task.status !== "COMPLETED" &&
      task.dueDate < now
  );

  const lowPriorityTasks = tasks.filter(
    (task) => task.priority === "LOW"
  );

  const mediumPriorityTasks = tasks.filter(
    (task) => task.priority === "MEDIUM"
  );

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "HIGH"
  );

  const completionRate =
    tasks.length === 0
      ? 0
      : Number(
          (
            (completedTasks.length / tasks.length) *
            100
          ).toFixed(2)
        );

    const reportDurationInDays = Math.max(
  Math.ceil(
    (endDate.getTime() - startDate.getTime()) /
      (24 * 60 * 60 * 1000)
  ) + 1,
  1
);

const averageTasksPerDay = Number(
  (
    tasks.length / reportDurationInDays
  ).toFixed(2)
);

const highPriorityPercentage =
  tasks.length === 0
    ? 0
    : Number(
        (
          (highPriorityTasks.length /
            tasks.length) *
          100
        ).toFixed(2)
      );

const overduePercentage =
  tasks.length === 0
    ? 0
    : Number(
        (
          (overdueTasks.length /
            tasks.length) *
          100
        ).toFixed(2)
      );

const productivityScore = Number(
  Math.max(
    0,
    Math.min(
      100,
      completionRate -
        overduePercentage * 0.5
    )
  ).toFixed(2)
);

const priorityCounts = {
  LOW: lowPriorityTasks.length,
  MEDIUM: mediumPriorityTasks.length,
  HIGH: highPriorityTasks.length,
};

const mostCommonPriority =
  tasks.length === 0
    ? null
    : (
        Object.entries(priorityCounts).sort(
          (firstItem, secondItem) =>
            secondItem[1] - firstItem[1]
        )[0]?.[0] ?? null
      );

const statusCounts = {
  PENDING: pendingTasks.length,
  IN_PROGRESS: inProgressTasks.length,
  COMPLETED: completedTasks.length,
};

const mostCommonStatus =
  tasks.length === 0
    ? null
    : (
        Object.entries(statusCounts).sort(
          (firstItem, secondItem) =>
            secondItem[1] - firstItem[1]
        )[0]?.[0] ?? null
      );

const activeTasks = tasks.filter(
  (task) => task.status !== "COMPLETED"
);

const longestPendingTask =
  activeTasks.length === 0
    ? null
    : [...activeTasks]
        .sort(
          (firstTask, secondTask) =>
            firstTask.createdAt.getTime() -
            secondTask.createdAt.getTime()
        )
        .map((task) => ({
          id: task.id,
          title: task.title,
          status: task.status,
          priority: task.priority,
          createdAt: task.createdAt,
          daysPending: Math.max(
            Math.floor(
              (now.getTime() -
                task.createdAt.getTime()) /
                (24 * 60 * 60 * 1000)
            ),
            0
          ),
        }))[0];

const tasksWithCompletionDate =
  completedTasks.filter(
    (task) => task.completedAt
  );

const averageCompletionTimeDays =
  tasksWithCompletionDate.length === 0
    ? null
    : Number(
        (
          tasksWithCompletionDate.reduce(
            (total, task) => {
              const completionTime =
                task.completedAt!.getTime() -
                task.createdAt.getTime();

              return (
                total +
                completionTime /
                  (24 * 60 * 60 * 1000)
              );
            },
            0
          ) / tasksWithCompletionDate.length
        ).toFixed(2)
      );

const completedOnTime =
  tasksWithCompletionDate.filter(
    (task) =>
      task.completedAt! <= task.dueDate
  ).length;

const completedLate =
  tasksWithCompletionDate.filter(
    (task) =>
      task.completedAt! > task.dueDate
  ).length;



  const statusDistribution = [
    {
      name: "Pending",
      value: pendingTasks.length,
    },
    {
      name: "In Progress",
      value: inProgressTasks.length,
    },
    {
      name: "Completed",
      value: completedTasks.length,
    },
    {
      name: "Overdue",
      value: overdueTasks.length,
    },
  ];

  const priorityDistribution = [
    {
      name: "Low",
      value: lowPriorityTasks.length,
    },
    {
      name: "Medium",
      value: mediumPriorityTasks.length,
    },
    {
      name: "High",
      value: highPriorityTasks.length,
    },
  ];

  const creationTrendMap = new Map<
    string,
    number
  >();

  for (const task of tasks) {
    const key = formatDateKey(task.createdAt);

    creationTrendMap.set(
      key,
      (creationTrendMap.get(key) || 0) + 1
    );
  }

  const creationTrend = Array.from(
    creationTrendMap.entries()
  )
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort(
      (firstItem, secondItem) =>
        new Date(firstItem.date).getTime() -
        new Date(secondItem.date).getTime()
    );

  const dueDateTrendMap = new Map<
    string,
    number
  >();

  for (const task of tasks) {
    const key = formatDateKey(task.dueDate);

    dueDateTrendMap.set(
      key,
      (dueDateTrendMap.get(key) || 0) + 1
    );
  }

  const dueDateTrend = Array.from(
    dueDateTrendMap.entries()
  )
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort(
      (firstItem, secondItem) =>
        new Date(firstItem.date).getTime() -
        new Date(secondItem.date).getTime()
    );

  const generatedAt = new Date();

  return {
    report: {
      title: "Task Management Report",
      period,
      startDate,
      endDate,
      generatedAt,
    },

    summary: {
        totalTasks: tasks.length,
        pendingTasks: pendingTasks.length,
        inProgressTasks: inProgressTasks.length,
        completedTasks: completedTasks.length,
        overdueTasks: overdueTasks.length,

        lowPriorityTasks: lowPriorityTasks.length,
        mediumPriorityTasks:
            mediumPriorityTasks.length,
        highPriorityTasks: highPriorityTasks.length,

        completionRate,
        productivityScore,
        averageTasksPerDay,
        highPriorityPercentage,
        overduePercentage,

        mostCommonPriority,
        mostCommonStatus,

        reportDurationInDays,
        averageCompletionTimeDays,
        completedOnTime,
        completedLate,

        longestPendingTask,
    },

    charts: {
      statusDistribution,
      priorityDistribution,
      creationTrend,
      dueDateTrend,
    },

    tasks,
  };
};