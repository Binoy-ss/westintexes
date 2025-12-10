export enum ContentType {
  PDF = 'PDF',
  VIDEO = 'VIDEO',
  TEST = 'TEST'
}

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  duration?: string; // e.g. "15 mins" or "12 pages"
  locked: boolean;
}

export interface Bundle {
  id: string;
  title: string;
  examCategory: string; // e.g., "UPSC", "SSC"
  description: string;
  price: number;
  originalPrice: number;
  thumbnail: string;
  features: string[];
  content: ContentItem[];
  rating: number;
  studentsEnrolled: number;
}

export interface UserStats {
  testsAttended: number;
  testsPassed: number;
  testsFailed: number;
  timeSpent: string; // e.g. "14h 30m"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  purchasedBundleIds: string[];
  stats: UserStats;
}

export interface CartItem {
  bundle: Bundle;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}