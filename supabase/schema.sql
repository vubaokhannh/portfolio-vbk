-- ============================================================
-- FULL DATABASE SCHEMA for vubaokhanh portfolio
-- Run this script in Supabase SQL Editor
-- ============================================================

-- 1. Personal Info Table
CREATE TABLE IF NOT EXISTS public.personal_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL DEFAULT 'vubaokhanh',
    name TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role_en TEXT,
    role_vi TEXT,
    tagline_en TEXT,
    tagline_vi TEXT,
    bio_en TEXT,
    bio_vi TEXT,
    location TEXT,
    email TEXT,
    github TEXT,
    linkedin TEXT,
    facebook TEXT,
    cv_url TEXT,
    stack TEXT[] DEFAULT '{}',
    stats JSONB DEFAULT '[]',
    theme_color TEXT DEFAULT '#00D9FF',
    theme_config JSONB DEFAULT '{"themeColor":"#00D9FF","secondaryColor":"#7C3AED","bgColor":"#050505","cardBgColor":"#0f1117","blurStrength":"20px","borderRadius":"16px"}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_vi TEXT NOT NULL,
    description_en TEXT,
    description_vi TEXT,
    icon TEXT,
    color TEXT,
    tags TEXT[] DEFAULT '{}',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_vi TEXT NOT NULL,
    description_en TEXT,
    description_vi TEXT,
    long_description_en TEXT,
    long_description_vi TEXT,
    tech TEXT[] DEFAULT '{}',
    features_en TEXT[] DEFAULT '{}',
    features_vi TEXT[] DEFAULT '{}',
    image TEXT,
    color TEXT,
    accent_color TEXT,
    status TEXT DEFAULT 'completed',
    year TEXT,
    github_url TEXT,
    live_url TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Experience Table
CREATE TABLE IF NOT EXISTS public.experience (
    id TEXT PRIMARY KEY,
    company TEXT NOT NULL,
    role_en TEXT NOT NULL,
    role_vi TEXT NOT NULL,
    duration_en TEXT,
    duration_vi TEXT,
    description_en TEXT,
    description_vi TEXT,
    tags TEXT[] DEFAULT '{}',
    color TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    slug TEXT PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_vi TEXT NOT NULL,
    description_en TEXT,
    description_vi TEXT,
    content_en TEXT,
    content_vi TEXT,
    date_en TEXT,
    date_vi TEXT,
    iso_date TEXT,
    tags TEXT[] DEFAULT '{}',
    author_en TEXT DEFAULT 'Vu Bao Khanh',
    author_vi TEXT DEFAULT 'Vũ Bảo Khanh',
    read_time_en TEXT,
    read_time_vi TEXT,
    cover_image TEXT DEFAULT '/og-image.png',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. SEO & Schema.org Config Table
CREATE TABLE IF NOT EXISTS public.seo_config (
    key TEXT PRIMARY KEY DEFAULT 'vubaokhanh',
    seo_title TEXT,
    seo_description TEXT,
    canonical_url TEXT DEFAULT 'https://vubaokhanh.tech',
    google_verification TEXT,
    keywords_input TEXT,
    og_image_url TEXT DEFAULT 'https://vubaokhanh.tech/og-image.png',
    twitter_handle TEXT DEFAULT '@vubaokhannh',
    author_name TEXT DEFAULT 'Vũ Bảo Khanh',
    job_title TEXT DEFAULT 'Fullstack Web Engineer',
    organization TEXT DEFAULT 'BM WEB',
    allow_indexing BOOLEAN DEFAULT true,
    faq_schema JSONB DEFAULT '[]',
    person_schema_custom JSONB DEFAULT '{}',
    custom_raw_jsonld TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT '⚡',
    category TEXT NOT NULL DEFAULT 'frontend',
    level INTEGER NOT NULL DEFAULT 4,
    description_en TEXT,
    description_vi TEXT,
    color TEXT DEFAULT '#00D9FF',
    sort_order INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Create Policies (Public Read Access)
CREATE POLICY "Allow public read personal_info" ON public.personal_info FOR SELECT USING (true);
CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Allow public read blog_posts" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read seo_config" ON public.seo_config FOR SELECT USING (true);
CREATE POLICY "Allow public read skills" ON public.skills FOR SELECT USING (true);

-- Create Policies (Authenticated Write Access)
CREATE POLICY "Allow auth write personal_info" ON public.personal_info FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow auth write services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow auth write projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow auth write experience" ON public.experience FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow auth write blog_posts" ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow auth write seo_config" ON public.seo_config FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow auth write skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 8. Contact Messages Table (for storing customer inquiries)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    ip_address TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert contact_messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public read contact_messages" ON public.contact_messages FOR SELECT USING (true);
CREATE POLICY "Allow auth write contact_messages" ON public.contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);
