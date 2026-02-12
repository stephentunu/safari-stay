
-- Create newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admins can view subscribers"
  ON public.newsletter_subscribers FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create property requests table
CREATE TABLE public.property_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT NOT NULL,
  property_type TEXT NOT NULL,
  budget_min NUMERIC,
  budget_max NUMERIC,
  bedrooms INTEGER,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.property_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create property requests"
  ON public.property_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own requests"
  ON public.property_requests FOR SELECT
  USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update property requests"
  ON public.property_requests FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Add cancellation_policy column to properties
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS cancellation_policy TEXT DEFAULT 'flexible';

-- Add review score categories to reviews table
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS cleanliness_score INTEGER;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS location_score INTEGER;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS value_score INTEGER;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS service_score INTEGER;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS facilities_score INTEGER;

-- Add host profile fields
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_verified_host BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS response_rate INTEGER;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS response_time TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS host_since TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS languages TEXT[];

-- Create trigger for property_requests updated_at
CREATE TRIGGER update_property_requests_updated_at
  BEFORE UPDATE ON public.property_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
