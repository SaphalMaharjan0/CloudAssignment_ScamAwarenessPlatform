import axiosClient from './axiosClient';
import { ScamReport } from '../types/scamReport.types';

export const scamReportApi = {
  getReports: async (): Promise<ScamReport[]> => {
    const response = await axiosClient.get('/reports');
    return response.data;
  },
  getReportById: async (id: string): Promise<ScamReport> => {
    const response = await axiosClient.get(`/reports/${id}`);
    return response.data;
  },
  createReport: async (data: ScamReport): Promise<ScamReport> => {
    const response = await axiosClient.post('/reports', data);
    return response.data;
  },
  updateReport: async (id: string, data: ScamReport): Promise<ScamReport> => {
    const response = await axiosClient.put(`/reports/${id}`, data);
    return response.data;
  },
  deleteReport: async (id: string): Promise<void> => {
    await axiosClient.delete(`/reports/${id}`);
  }
};
