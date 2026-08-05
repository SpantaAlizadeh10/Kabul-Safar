-- Create articles table
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT,
  author TEXT,
  cover_image TEXT,
  status TEXT DEFAULT 'draft', -- draft, published
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create index on slug for faster lookups
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true);

-- Storage policies
CREATE POLICY "Public read access for media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

CREATE POLICY "Authenticated upload access for media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated update access for media"
ON storage.objects FOR UPDATE
TO authenticated
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated delete access for media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media');

-- Articles policies (you can adjust these based on your auth needs)
CREATE POLICY "Public read access for published articles"
ON articles FOR SELECT
TO public
USING (status = 'published');

CREATE POLICY "Anon insert access for articles"
ON articles FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Anon update access for articles"
ON articles FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);

CREATE POLICY "Anon delete access for articles"
ON articles FOR DELETE
TO anon
USING (true);

CREATE POLICY "Authenticated full access to articles"
ON articles FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
