import { Category, User } from './scamReport.types';

export interface Article {
  id?: number;
  title: string;
  slug?: string;
  content: string;
  category?: Category;
  author?: User;
  coverImageUrl?: string;
  viewsCount?: number;
  readTimeMinutes?: number;
  status?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}
