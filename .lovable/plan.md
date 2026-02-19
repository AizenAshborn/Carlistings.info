

# CarListings.info — "The Terminal" Build Plan

## 1. Dark Terminal Landing Page
A stark, dark-mode interface with the CarListings.info brand. Deep black background (#09090B), monospaced typography (JetBrains Mono for data, Inter for UI), and sharp-edged cards with 1px borders. A single centered upload zone with the prompt: **"Upload Listing Screenshot."** Accepts JPG, PNG, WEBP up to 5MB. No text input — image only.

## 2. Processing Animation
After upload, a terminal-style output simulation plays with monospaced green text scrolling line-by-line:
- `> Parsing chassis metadata from image...`
- `> Cross-referencing known failure indices...`
- `> Calculating local market spread...`

## 3. AI Analysis Engine (Edge Function)
A Supabase edge function that:
- Receives the uploaded image
- Resizes to 1024px width server-side before AI processing
- Sends to Lovable AI (Gemini) with the hardcoded system prompt (hidden from user)
- Forces strict JSON output with the defined schema
- Returns structured data or an error code for tampered/non-car images
- Handles rate limit (429) and payment (402) errors gracefully

## 4. Image Hash Caching (Database)
Before calling AI, generate a SHA-256 hash of the image. Check the database — if the same screenshot was already analyzed, return the cached JSON instantly. Saves cost and latency. Database table stores: image hash, JSON result, timestamp, and metadata.

## 5. Rate Limiting
IP-based rate limiting: 3 free scans per 24 hours. Tracked in the database with IP address and scan timestamps. Enforced server-side in the edge function.

## 6. The Information Dashboard (Results Page)
A grid-based data terminal displaying:

- **Asset Header** — Year, Make, Model, Trim displayed in monospaced type with a status badge (Matrix Green for undervalued, Warning Red for overvalued)
- **Market Spread Chart** — Horizontal bar chart (Recharts) showing listing price vs. CLI Market Average with color-coded verdict
- **Risk Disclosures Panel** — Financial-style risk warnings with severity indicators (High/Moderate/Low) using color-coded badges, each with a technical summary
- **Liability Projection** — Monthly maintenance budget estimate displayed as a prominent metric card
- **Auditor Note** — A highlighted callout with the AI-generated question to ask the seller

## 7. Actions & Export
- **"Export .info Report"** button — generates a downloadable summary (could be a styled printable page or text file)
- **"Scan New Listing"** button — returns to the upload screen

## 8. Error Handling
- Invalid/tampered images show a clean "PROCESSING ERROR — TAMPERED_ASSET" terminal message
- Invalid JSON from AI shows generic "Processing Error" with no data leakage
- Rate limit exceeded shows scan count and reset time

