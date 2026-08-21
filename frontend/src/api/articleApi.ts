import axiosClient from './axiosClient';
import { Article } from '../types/article.types';

export const articleApi = {
  getArticles: async (): Promise<Article[]> => {
    const response = await axiosClient.get('/articles');
    return response.data;
  },
  createArticle: async (data: Article): Promise<Article> => {
    const response = await axiosClient.post('/articles', data);
    return response.data;
  },
  updateArticle: async (id: number, data: Partial<Article>): Promise<Article> => {
    const response = await axiosClient.put(`/articles/${id}`, data);
    return response.data;
  },
  deleteArticle: async (id: number): Promise<void> => {
    await axiosClient.delete(`/articles/${id}`);
  }
};
