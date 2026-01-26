-- Add property_rules column to properties table
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS property_rules text[] DEFAULT '{}';

-- Add attraction_details column (JSONB to store attraction type -> specific name mappings)
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS attraction_details jsonb DEFAULT '{}';

-- Add custom_board_types column for hosts to add their own board type options
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS custom_board_types jsonb DEFAULT '[]';