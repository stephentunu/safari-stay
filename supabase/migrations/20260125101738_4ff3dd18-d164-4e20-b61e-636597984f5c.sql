-- Add room configurations to properties table
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS board_type text DEFAULT 'standard',
ADD COLUMN IF NOT EXISTS room_categories jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS bed_types text[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS child_free_age integer DEFAULT 10;

-- Add room selection to bookings
ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS board_type text,
ADD COLUMN IF NOT EXISTS room_category text,
ADD COLUMN IF NOT EXISTS bed_type text,
ADD COLUMN IF NOT EXISTS adults integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS children_details jsonb DEFAULT '[]'::jsonb;

-- Add comments for documentation
COMMENT ON COLUMN public.properties.board_type IS 'Default board type: fully_board, half_board, or standard';
COMMENT ON COLUMN public.properties.room_categories IS 'JSON array of room categories with prices: [{name: string, price: number}]';
COMMENT ON COLUMN public.properties.bed_types IS 'Available bed types: single, double';
COMMENT ON COLUMN public.properties.child_free_age IS 'Children below this age stay free (default 10)';
COMMENT ON COLUMN public.bookings.board_type IS 'Selected board type for this booking';
COMMENT ON COLUMN public.bookings.room_category IS 'Selected room category for this booking';
COMMENT ON COLUMN public.bookings.bed_type IS 'Selected bed type for this booking';
COMMENT ON COLUMN public.bookings.children_details IS 'JSON array of children with ages: [{age: number}]';