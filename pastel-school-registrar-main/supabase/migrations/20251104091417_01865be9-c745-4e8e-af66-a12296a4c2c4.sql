-- Create storage bucket for school images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('school-images', 'school-images', true);

-- Enable public access to view images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'school-images');

-- Allow anyone to upload images (you can restrict this later if needed)
CREATE POLICY "Anyone can upload school images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'school-images');