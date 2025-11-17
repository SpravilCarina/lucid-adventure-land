-- Create table for storing generated story images
CREATE TABLE public.story_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_name TEXT NOT NULL,
  step_number INTEGER NOT NULL,
  step_text TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.story_images ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view images (public gallery)
CREATE POLICY "Anyone can view story images" 
ON public.story_images 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert images
CREATE POLICY "Anyone can insert story images" 
ON public.story_images 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_story_images_created_at ON public.story_images(created_at DESC);
CREATE INDEX idx_story_images_story_name ON public.story_images(story_name);