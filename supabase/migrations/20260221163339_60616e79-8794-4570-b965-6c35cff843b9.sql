CREATE TABLE public.insurance_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_identifier TEXT NOT NULL,
  first_name TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.insurance_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.insurance_leads
  FOR INSERT WITH CHECK (true);
