import { Response } from "express";

import type { AuthRequest } from "../types/auth.types";
import {
  generateTaskReport,
  type ReportPeriod,
} from "../services/report.service";

const validPeriods: ReportPeriod[] = [
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "custom",
];

export const getTaskReport = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const period =
      typeof req.query.period === "string"
        ? req.query.period.toLowerCase()
        : "monthly";

    const startDate =
      typeof req.query.startDate === "string"
        ? req.query.startDate
        : undefined;

    const endDate =
      typeof req.query.endDate === "string"
        ? req.query.endDate
        : undefined;

    if (
      !validPeriods.includes(
        period as ReportPeriod
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Period must be daily, weekly, monthly, yearly or custom.",
      });
    }

    if (
      period === "custom" &&
      (!startDate || !endDate)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Start date and end date are required for custom reports.",
      });
    }

    const data = await generateTaskReport({
      userId: req.userId!,
      period: period as ReportPeriod,
      startDate,
      endDate,
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(
      "Generate task report error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to generate task report.";

    return res.status(400).json({
      success: false,
      message,
    });
  }
};