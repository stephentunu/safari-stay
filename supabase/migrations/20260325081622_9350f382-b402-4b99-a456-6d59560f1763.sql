
-- 1. Fix profiles: restrict public SELECT to authenticated users only
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Profiles viewable by authenticated users"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- 2. Fix payments: restrict INSERT to authenticated users who own the booking
DROP POLICY IF EXISTS "System can insert payments" ON public.payments;

CREATE POLICY "Authenticated users can insert payments for their bookings"
ON public.payments
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.bookings
    WHERE bookings.id = payments.booking_id
    AND bookings.traveler_id = auth.uid()
  )
);

-- 3. Fix property_requests: restrict INSERT to authenticated users
DROP POLICY IF EXISTS "Users can create property requests" ON public.property_requests;

CREATE POLICY "Authenticated users can create property requests"
ON public.property_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 4. Fix newsletter_subscribers: restrict INSERT to authenticated users
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;

CREATE POLICY "Authenticated users can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
TO authenticated
WITH CHECK (true);
