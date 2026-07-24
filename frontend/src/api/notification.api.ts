import api from "./api";

import type {
  NotificationsResponse,
} from "../types/notification.types";

export const getNotifications =
  async (): Promise<NotificationsResponse> => {
    const response =
      await api.get<NotificationsResponse>(
        "/notifications"
      );

    return response.data;
  };

export const markNotificationAsRead =
  async (id: string) => {
    const response =
      await api.patch(
        `/notifications/${id}/read`
      );

    return response.data;
  };

export const markAllNotificationsAsRead =
  async () => {
    const response =
      await api.patch(
        "/notifications/read-all"
      );

    return response.data;
  };