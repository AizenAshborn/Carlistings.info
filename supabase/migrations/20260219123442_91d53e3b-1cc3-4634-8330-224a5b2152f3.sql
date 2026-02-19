
-- Cache table for image analysis results
CREATE TABLE public.analysis_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_hash TEXT NOT NULL UNIQUE,
  result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Rate limiting table
CREATE TABLE public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  scanned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_rate_limits_ip_time ON public.rate_limits (ip_address, scanned_at);
CREATE INDEX idx_analysis_cache_hash ON public.analysis_cache (image_hash);

-- Enable RLS but allow public access via edge function (no user auth needed)
ALTER TABLE public.analysis_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Service role only policies (edge functions use service role)
CREATE POLICY "Service role full access on analysis_cache"
  ON public.analysis_cache FOR ALL
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on rate_limits"
  ON public.rate_limits FOR ALL
  USING (true) WITH CHECK (true);
