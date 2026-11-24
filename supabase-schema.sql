-- =========================================================================
-- Om Agencies - Rooftop Solar EPC & Supreme Solar Water Heaters Platform
-- Complete Supabase PostgreSQL Schema with Row Level Security (RLS)
-- Location: Chhatrapati Sambhajinagar, Maharashtra
-- Proprietor: D. B. Magar | GSTIN: 27ASIPM4616L1ZD
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS / PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  customer_type TEXT DEFAULT 'residential' CHECK (customer_type IN ('residential', 'commercial', 'society')),
  locality TEXT, -- e.g. "N-11 HUDCO", "CIDCO", "Ulkanagari"
  address TEXT,
  msedcl_consumer_no TEXT, -- 12 digit MSEDCL consumer number
  sanctioned_load NUMERIC(5, 2), -- kW
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  project_number TEXT UNIQUE NOT NULL, -- e.g. "OM-2026-089"
  service_type TEXT NOT NULL, -- "Rooftop Solar EPC" | "Supreme Solar Water Heater" | "Geyser Repair & Descaling"
  capacity TEXT NOT NULL, -- "3 kW" | "200 LPD"
  system_size_kw NUMERIC(5, 2),
  brand TEXT DEFAULT 'Waaree / Tata Power',
  locality TEXT NOT NULL,
  installation_site TEXT NOT NULL,
  status TEXT DEFAULT 'survey_scheduled' CHECK (status IN ('survey_scheduled', 'msedcl_paperwork', 'installation', 'commissioned')),
  scheduled_date TIMESTAMP WITH TIME ZONE,
  gross_cost NUMERIC(12, 2) DEFAULT 0 NOT NULL,
  subsidy_amount NUMERIC(12, 2) DEFAULT 0 NOT NULL, -- PM Surya Ghar DBT Subsidy
  net_cost NUMERIC(12, 2) DEFAULT 0 NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. PROJECT ITEMS TABLE (Detailed Quotation Bill of Materials)
CREATE TABLE IF NOT EXISTS public.project_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  specification TEXT,
  quantity NUMERIC(10, 2) DEFAULT 1 NOT NULL,
  rate NUMERIC(12, 2) DEFAULT 0 NOT NULL,
  amount NUMERIC(12, 2) DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. PAYMENTS TABLE (Token Deposits & Milestone Payments)
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  amount NUMERIC(12, 2) NOT NULL,
  currency TEXT DEFAULT 'INR' NOT NULL,
  method TEXT DEFAULT 'bank_transfer' CHECK (method IN ('upi', 'card', 'cheque', 'bank_transfer')),
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed')),
  transaction_id TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- USERS POLICIES
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id OR public.is_admin());

-- PROJECTS POLICIES
CREATE POLICY "Users can view own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert own projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users or admin can update projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = user_id OR public.is_admin());

-- PROJECT ITEMS POLICIES
CREATE POLICY "Users can view items for own projects"
  ON public.project_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_items.project_id
      AND (projects.user_id = auth.uid() OR public.is_admin())
    )
  );

-- PAYMENTS POLICIES
CREATE POLICY "Users can view own payments"
  ON public.payments FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert payments"
  ON public.payments FOR INSERT
  WITH CHECK (auth.uid() = user_id);
