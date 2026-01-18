-- Millennium Property Development - Supabase Database Setup
-- Run this script in your Supabase SQL Editor

-- Create the properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  perch_price NUMERIC NOT NULL,
  total_perches NUMERIC NOT NULL,
  has_water BOOLEAN DEFAULT false,
  has_electricity BOOLEAN DEFAULT false,
  has_telephone BOOLEAN DEFAULT false,
  distance_to_kandy TEXT,
  landmark TEXT,
  agent_name TEXT NOT NULL,
  agent_phone TEXT NOT NULL,
  images TEXT[],
  video_url TEXT,
  tour_360_url TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access
CREATE POLICY "Allow public read access"
ON properties FOR SELECT
TO public
USING (true);

-- Create a policy to allow authenticated insert (for admin panel)
CREATE POLICY "Allow authenticated insert"
ON properties FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create a policy to allow authenticated update
CREATE POLICY "Allow authenticated update"
ON properties FOR UPDATE
TO authenticated
USING (true);

-- Create a policy to allow authenticated delete
CREATE POLICY "Allow authenticated delete"
ON properties FOR DELETE
TO authenticated
USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_properties_utilities ON properties(has_water, has_electricity, has_telephone);

-- Insert sample data (OPTIONAL - for testing)
INSERT INTO properties (
  title,
  location,
  perch_price,
  total_perches,
  has_water,
  has_electricity,
  has_telephone,
  distance_to_kandy,
  landmark,
  agent_name,
  agent_phone,
  description,
  images
) VALUES
(
  'Premium Land in Haragama',
  'Haragama',
  500000,
  20,
  true,
  true,
  true,
  '5 km from Kandy City',
  'Near Dharmaraja College',
  'Uthpala',
  '+94 777 123 456',
  'Beautiful land plot with all utilities available. Perfect for residential construction with easy access to Kandy city.',
  ARRAY['https://placeholder-image-url-1.jpg']
),
(
  'Scenic Plot in Katugastota',
  'Katugastota',
  450000,
  15,
  true,
  true,
  false,
  '6 km from Kandy',
  'Near Polgolla Reservoir',
  'Dinushika',
  '+94 777 234 567',
  'Peaceful location with scenic views. Water and electricity available. Ideal for a quiet family home.',
  ARRAY['https://placeholder-image-url-2.jpg']
),
(
  'Prime Commercial Land in Peradeniya',
  'Peradeniya',
  600000,
  25,
  true,
  true,
  true,
  '3 km from Kandy',
  'Near University of Peradeniya',
  'Channa',
  '+94 777 345 678',
  'Excellent commercial property close to the university. All utilities connected. High potential for appreciation.',
  ARRAY['https://placeholder-image-url-3.jpg']
);

-- Verify the data
SELECT * FROM properties;

-- Note: Remember to replace placeholder image URLs with actual Cloudinary URLs
-- after uploading your property images to Cloudinary.
