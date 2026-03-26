
-- Create fraud_flags table
CREATE TABLE public.fraud_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  flag_type text NOT NULL, -- 'booking' or 'listing'
  reference_id uuid NOT NULL, -- booking or property id
  reason text NOT NULL,
  severity text NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'high'
  status text NOT NULL DEFAULT 'pending', -- 'pending', 'reviewed', 'dismissed', 'confirmed'
  reviewed_by uuid REFERENCES public.profiles(id),
  review_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.fraud_flags ENABLE ROW LEVEL SECURITY;

-- Only admins can view fraud flags
CREATE POLICY "Admins can view fraud flags"
ON public.fraud_flags FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update fraud flags
CREATE POLICY "Admins can update fraud flags"
ON public.fraud_flags FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- System can insert fraud flags (via triggers)
CREATE POLICY "System can insert fraud flags"
ON public.fraud_flags FOR INSERT TO authenticated
WITH CHECK (true);

-- Trigger to auto-detect suspicious bookings
CREATE OR REPLACE FUNCTION public.check_booking_fraud()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  recent_count integer;
  avg_price numeric;
BEGIN
  -- Check 1: Rapid bookings (more than 5 in last hour by same user)
  SELECT COUNT(*) INTO recent_count
  FROM public.bookings
  WHERE traveler_id = NEW.traveler_id
    AND created_at > now() - interval '1 hour';

  IF recent_count > 5 THEN
    INSERT INTO public.fraud_flags (flag_type, reference_id, reason, severity)
    VALUES ('booking', NEW.id, 'Rapid booking activity: ' || recent_count || ' bookings in the last hour', 'high');
  END IF;

  -- Check 2: Unusually high booking amount (over KES 500,000)
  IF NEW.total_price > 500000 THEN
    INSERT INTO public.fraud_flags (flag_type, reference_id, reason, severity)
    VALUES ('booking', NEW.id, 'Unusually high booking amount: KES ' || NEW.total_price::text, 'medium');
  END IF;

  -- Check 3: Same-day check-in and check-out
  IF NEW.check_in_date = NEW.check_out_date THEN
    INSERT INTO public.fraud_flags (flag_type, reference_id, reason, severity)
    VALUES ('booking', NEW.id, 'Same-day check-in and check-out dates', 'low');
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_check_booking_fraud
AFTER INSERT ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.check_booking_fraud();

-- Trigger to auto-detect suspicious property listings
CREATE OR REPLACE FUNCTION public.check_listing_fraud()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  host_listing_count integer;
BEGIN
  -- Check 1: Suspiciously low price (under KES 100)
  IF NEW.price_per_night < 100 THEN
    INSERT INTO public.fraud_flags (flag_type, reference_id, reason, severity)
    VALUES ('listing', NEW.id, 'Suspiciously low price: KES ' || NEW.price_per_night::text || '/night', 'high');
  END IF;

  -- Check 2: Host creating too many listings rapidly (more than 10 in a day)
  SELECT COUNT(*) INTO host_listing_count
  FROM public.properties
  WHERE host_id = NEW.host_id
    AND created_at > now() - interval '1 day';

  IF host_listing_count > 10 THEN
    INSERT INTO public.fraud_flags (flag_type, reference_id, reason, severity)
    VALUES ('listing', NEW.id, 'Rapid listing activity: ' || host_listing_count || ' listings in 24 hours', 'high');
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_check_listing_fraud
AFTER INSERT ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.check_listing_fraud();
