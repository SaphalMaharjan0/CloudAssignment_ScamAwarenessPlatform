import axiosClient from './axiosClient';
import { Notification } from '../types/notification.types';

export const notificationApi = {
  getNotifications: async (): Promise<Notification[]> => {
    const response = await axiosClient.get('/notifications');
    return response.data;
  },
  createNotification: async (data: Notification): Promise<Notification> => {
    const response = await axiosClient.post('/notifications', data);
    return response.data;
  }
};
