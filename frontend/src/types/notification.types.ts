import { User } from './scamReport.types';

export interface Notification {
  id?: number;
  user?: User;
  title: string;
  message: string;
  type?: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt?: string;
}
