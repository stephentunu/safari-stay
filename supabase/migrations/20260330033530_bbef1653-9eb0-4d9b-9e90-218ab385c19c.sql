
-- Property views analytics table
CREATE TABLE public.property_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  viewer_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  viewed_at timestamp with time zone NOT NULL DEFAULT now(),
  session_id text
);

ALTER TABLE public.property_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert views (even anonymous)
CREATE POLICY "Anyone can insert property views"
ON public.property_views FOR INSERT TO public
WITH CHECK (true);

-- Property hosts and admins can view analytics
CREATE POLICY "Hosts can view their property analytics"
ON public.property_views FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.properties
    WHERE properties.id = property_views.property_id
    AND (properties.host_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
  )
);

-- Enable realtime for property_views
ALTER PUBLICATION supabase_realtime ADD TABLE public.property_views;
