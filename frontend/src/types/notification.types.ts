export type NotificationType =
  | "DUE_SOON"
  | "DUE_TODAY"
  | "OVERDUE";

export interface NotificationTask {
  id: string;
  title: string;
  dueDate: string;
  status: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  task: NotificationTask;
}

export interface NotificationsResponse {
  success: boolean;
  unreadCount: number;
  count: number;
  data: Notification[];
}