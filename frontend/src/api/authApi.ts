import axiosClient from './axiosClient';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axiosClient.post('/auth/register', data);
    return response.data;
  },

  updateProfile: async (data: { name: string; currentPassword?: string; newPassword?: string }): Promise<User> => {
    const response = await axiosClient.put('/users/me', data);
    return response.data;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await axiosClient.post('/auth/forgot-password', { email });
  },

  verifyOtp: async (email: string, otp: string): Promise<void> => {
    await axiosClient.post('/auth/verify-otp', { email, otp });
  },

  resetPassword: async (email: string, otp: string, newPassword: string): Promise<void> => {
    await axiosClient.post('/auth/reset-password', { email, otp, newPassword });
  }
};
