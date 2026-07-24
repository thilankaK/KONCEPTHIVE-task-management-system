import { Response } from "express";

import type { AuthRequest } from "../types/auth.types";
import * as notificationService from "../services/notification.service";

export const getNotifications = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const notifications =
      await notificationService.generateTaskNotifications(
        req.userId!
      );

    const unreadCount = notifications.filter(
      (notification) => !notification.isRead
    ).length;

    return res.status(200).json({
      success: true,
      unreadCount,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load notifications.",
    });
  }
};

export const markAsRead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const notificationId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!notificationId) {
      return res.status(400).json({
        success: false,
        message: "Notification ID is required.",
      });
    }

    const notification =
      await notificationService.markNotificationAsRead(
        notificationId,
        req.userId!
      );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read.",
      data: notification,
    });
  } catch (error) {
    console.error("Mark notification error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update notification.",
    });
  }
};

export const markAllAsRead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    await notificationService.markAllNotificationsAsRead(
      req.userId!
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read.",
    });
  } catch (error) {
    console.error("Mark all notifications error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update notifications.",
    });
  }
};