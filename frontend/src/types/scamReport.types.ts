export interface Category {
  id?: number;
  name: string;
  description?: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  role?: string;
}

export interface ScamReport {
  id?: string;
  title: string;
  description: string;
  category?: Category;
  reporter?: User;
  priority?: string;
  status?: string;
  scammerDetails?: string;
  financialLoss?: number;
  platformUsed?: string;
  documentUrls?: string[];
  createdAt?: string;
  updatedAt?: string;
}
