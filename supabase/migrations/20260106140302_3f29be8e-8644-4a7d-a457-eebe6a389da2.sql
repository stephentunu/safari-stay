-- Add new columns to properties table for attractions and transport modes
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS nearby_attractions text[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS transport_modes text[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS image_labels text[] DEFAULT '{}'::text[];

-- Update the property_type enum to include new types
ALTER TYPE public.property_type ADD VALUE IF NOT EXISTS 'airbnb';
ALTER TYPE public.property_type ADD VALUE IF NOT EXISTS 'rental';
ALTER TYPE public.property_type ADD VALUE IF NOT EXISTS 'resort';
ALTER TYPE public.property_type ADD VALUE IF NOT EXISTS 'motel';
ALTER TYPE public.property_type ADD VALUE IF NOT EXISTS 'restaurant';

-- Create online_users table to track active sessions
CREATE TABLE IF NOT EXISTS public.online_users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  last_seen timestamp with time zone NOT NULL DEFAULT now(),
  is_online boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add unique constraint on user_id
ALTER TABLE public.online_users ADD CONSTRAINT online_users_user_id_key UNIQUE (user_id);

-- Enable RLS on online_users
ALTER TABLE public.online_users ENABLE ROW LEVEL SECURITY;

-- Create policies for online_users
CREATE POLICY "Admins can view all online users"
ON public.online_users
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can update their own online status"
ON public.online_users
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add DELETE policy for properties for admins
CREATE POLICY "Admins can delete any property"
ON public.properties
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Enable realtime for online_users
ALTER PUBLICATION supabase_realtime ADD TABLE public.online_users;