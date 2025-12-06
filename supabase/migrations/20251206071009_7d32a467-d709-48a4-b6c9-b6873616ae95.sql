-- Add food_types and services columns to properties table
-- food_types: Array of food types offered (for hotels/restaurants)
-- services: Array of services offered by the property

ALTER TABLE public.properties
ADD COLUMN food_types text[] DEFAULT '{}'::text[];

ALTER TABLE public.properties
ADD COLUMN services text[] DEFAULT '{}'::text[];