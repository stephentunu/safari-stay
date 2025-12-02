-- Fix foreign key relationships to point to profiles instead of auth.users
-- This enables proper joins in PostgREST API queries

-- Drop existing foreign keys that point to auth.users
ALTER TABLE public.properties DROP CONSTRAINT IF EXISTS properties_host_id_fkey;
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_traveler_id_fkey;
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_host_id_fkey;
ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_user_id_fkey;

-- Recreate foreign keys pointing to profiles table
ALTER TABLE public.properties
ADD CONSTRAINT properties_host_id_fkey
FOREIGN KEY (host_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.bookings
ADD CONSTRAINT bookings_traveler_id_fkey
FOREIGN KEY (traveler_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.bookings
ADD CONSTRAINT bookings_host_id_fkey
FOREIGN KEY (host_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.user_roles
ADD CONSTRAINT user_roles_user_id_fkey
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;