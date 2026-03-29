
-- Create experiences table
CREATE TABLE public.experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL,
  duration text NOT NULL,
  price text NOT NULL,
  rating numeric DEFAULT 0,
  reviews integer DEFAULT 0,
  image_url text,
  category text NOT NULL DEFAULT 'Wildlife',
  description text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Everyone can view active experiences
CREATE POLICY "Experiences are viewable by everyone"
ON public.experiences FOR SELECT
TO public
USING (is_active = true);

-- Admins can do everything
CREATE POLICY "Admins can insert experiences"
ON public.experiences FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update experiences"
ON public.experiences FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete experiences"
ON public.experiences FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can also view inactive experiences
CREATE POLICY "Admins can view all experiences"
ON public.experiences FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
