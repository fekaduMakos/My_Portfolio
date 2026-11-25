export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  case_study?: string | null;
  cover_image: string;
  demo_url?: string | null;
  github_url?: string | null;
  tags: string[];
  category: 'Fullstack' | 'Backend' | 'Frontend' | 'Mobile' | 'Cloud/DevOps';
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description: string[];
  technologies: string[];
  sort_order: number;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image?: string | null;
  tags: string[];
  is_published: boolean;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Channel {
  id: string;
  name: string;
  url: string;
  icon_key: string;
  custom_image_url?: string | null;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
}

export interface SiteSettings {
  id: number;
  full_name: string;
  headline: string;
  bio: string;
  availability_status: string;
  location: string;
  resume_url?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  twitter_url?: string | null;
  instagram_url?: string | null;
  facebook_url?: string | null;
  telegram_url?: string | null;
  email: string;
  updated_at: string;
}
