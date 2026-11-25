-- ============================================================
-- 001_initial_schema.sql
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. Enable UUID generator
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    case_study TEXT,
    cover_image TEXT NOT NULL,
    demo_url TEXT,
    github_url TEXT,
    tags TEXT[] NOT NULL DEFAULT '{}',
    category VARCHAR(100) DEFAULT 'Fullstack',
    featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    location VARCHAR(255) DEFAULT 'Remote',
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT[] NOT NULL DEFAULT '{}',
    technologies TEXT[] NOT NULL DEFAULT '{}',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT,
    tags TEXT[] NOT NULL DEFAULT '{}',
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. SITE PROFILE & SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    id INT PRIMARY KEY DEFAULT 1,
    full_name VARCHAR(255) NOT NULL,
    headline VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    availability_status VARCHAR(100) DEFAULT 'Available for Remote Work',
    location VARCHAR(100) DEFAULT 'International / Remote',
    resume_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    instagram_url TEXT,
    facebook_url TEXT,
    telegram_url TEXT,
    email VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6b. SOCIAL CHANNELS TABLE (Admin Controlled)
CREATE TABLE IF NOT EXISTS public.channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    icon_key VARCHAR(100) NOT NULL DEFAULT 'telegram',
    custom_image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;

-- 8. POLICIES: PUBLIC ACCESS
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can view experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public can view published posts" ON public.posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view channels" ON public.channels FOR SELECT USING (is_active = true);
CREATE POLICY "Public can insert messages" ON public.messages FOR INSERT WITH CHECK (true);

-- 9. POLICIES: ADMIN ACCESS (Authenticated Users)
CREATE POLICY "Admin full access projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access posts" ON public.posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access messages" ON public.messages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access channels" ON public.channels FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 10. STORAGE BUCKETS (Run in SQL or create in Supabase Dashboard > Storage)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true), ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for public read and authenticated write
CREATE POLICY "Public can view media" ON storage.objects FOR SELECT USING (bucket_id IN ('media', 'resumes'));
CREATE POLICY "Admin can upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('media', 'resumes'));
CREATE POLICY "Admin can update media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id IN ('media', 'resumes'));
CREATE POLICY "Admin can delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id IN ('media', 'resumes'));
