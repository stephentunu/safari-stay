
-- Fix 1: Prevent privilege escalation via user_roles INSERT
DROP POLICY IF EXISTS "Users can assign themselves roles during signup" ON public.user_roles;
CREATE POLICY "Users can self-assign non-privileged roles"
ON public.user_roles
FOR INSERT
WITH CHECK (
  (auth.uid() = user_id AND role IN ('traveler'::app_role, 'host'::app_role))
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- Fix 2: Restrict profiles SELECT to own profile + create safe public view
DROP POLICY IF EXISTS "Profiles viewable by authenticated users" ON public.profiles;

CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Hosts can view profiles of travelers who booked their properties
CREATE POLICY "Hosts can view their guests profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.bookings
  WHERE bookings.traveler_id = profiles.id
    AND bookings.host_id = auth.uid()
));

-- Travelers can view profiles of hosts they booked with
CREATE POLICY "Travelers can view their host profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.bookings
  WHERE bookings.host_id = profiles.id
    AND bookings.traveler_id = auth.uid()
));

-- Public-safe view for host discovery / reviews (no email or phone)
CREATE OR REPLACE VIEW public.public_profiles
WITH (security_invoker = true) AS
SELECT
  id,
  full_name,
  avatar_url,
  bio,
  languages,
  is_verified_host,
  response_rate,
  response_time,
  host_since,
  created_at
FROM public.profiles;

GRANT SELECT ON public.public_profiles TO anon, authenticated;

-- Allow anyone to read non-sensitive host profile data of approved property hosts via direct query
CREATE POLICY "Anyone can view hosts of approved properties"
ON public.profiles
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.properties
  WHERE properties.host_id = profiles.id
    AND properties.is_active = true
    AND properties.is_approved = true
));

-- Fix 3: Server-side booking price validation trigger
CREATE OR REPLACE FUNCTION public.validate_booking_price()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  prop_price numeric;
  nights integer;
  min_expected numeric;
BEGIN
  SELECT price_per_night INTO prop_price
  FROM public.properties
  WHERE id = NEW.property_id;

  IF prop_price IS NULL THEN
    RAISE EXCEPTION 'Invalid property reference';
  END IF;

  nights := GREATEST(1, (NEW.check_out_date - NEW.check_in_date));

  -- Allow up to 50% discount (for loyalty/credits) but reject obvious manipulation
  min_expected := prop_price * nights * 0.5;

  IF NEW.total_price IS NULL OR NEW.total_price <= 0 THEN
    RAISE EXCEPTION 'Booking total_price must be greater than zero';
  END IF;

  IF NEW.total_price < min_expected THEN
    RAISE EXCEPTION 'Booking total_price (%) is below the minimum allowed for this property (%)', NEW.total_price, min_expected;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_booking_price_trigger ON public.bookings;
CREATE TRIGGER validate_booking_price_trigger
BEFORE INSERT OR UPDATE OF total_price, property_id, check_in_date, check_out_date
ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.validate_booking_price();

-- Fix 4: Restrict property_views INSERT (was WITH CHECK true)
DROP POLICY IF EXISTS "Anyone can insert property views" ON public.property_views;
CREATE POLICY "Anyone can insert views for visible properties"
ON public.property_views
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.properties
    WHERE properties.id = property_views.property_id
      AND properties.is_active = true
      AND properties.is_approved = true
  )
);

-- Fix 5: Tighten newsletter_subscribers INSERT (was WITH CHECK true)
DROP POLICY IF EXISTS "Authenticated users can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Authenticated users can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
TO authenticated
WITH CHECK (
  email IS NOT NULL
  AND length(email) <= 255
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);
