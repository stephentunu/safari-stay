
-- Add discount columns to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS loyalty_discount_percent numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS original_price numeric;

-- Create a function to calculate loyalty discount based on completed bookings
CREATE OR REPLACE FUNCTION public.get_loyalty_discount(_user_id uuid)
RETURNS numeric
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT CASE
    WHEN COUNT(*) >= 20 THEN 20
    WHEN COUNT(*) >= 10 THEN 15
    WHEN COUNT(*) >= 5 THEN 10
    WHEN COUNT(*) >= 3 THEN 5
    ELSE 0
  END
  FROM public.bookings
  WHERE traveler_id = _user_id
    AND status = 'completed';
$$;
