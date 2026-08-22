import axiosClient from './axiosClient';
import { ScamReport } from '../types/scamReport.types';
import { User } from '../types/auth';

export interface AdminStats {
  totalUsers: number;
  totalReports: number;
  pendingReports: number;
  verifiedReports: number;
  latestPendingReports: ScamReport[];
  reportData: { name: string; reports: number }[];
  userGrowthData: { name: string; users: number }[];
}

export const adminApi = {
  getStats: async (): Promise<AdminStats> => {
    const response = await axiosClient.get('/admin/stats');
    return response.data;
  },

  getUsers: async (): Promise<User[]> => {
    const response = await axiosClient.get('/admin/users');
    return response.data;
  },

  updateReportStatus: async (id: string, status: string, adminFeedback?: string): Promise<ScamReport> => {
    const response = await axiosClient.put(`/admin/reports/${id}/status`, { status, adminFeedback });
    return response.data;
  },

  updateUser: async (id: number, data: Partial<User>): Promise<User> => {
    const response = await axiosClient.put(`/admin/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await axiosClient.delete(`/admin/users/${id}`);
  }
};
