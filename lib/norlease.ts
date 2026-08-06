export const norlease = {
  name: 'Norlease',
  tagline: 'Verified rental listings for North Bay, Ontario.',
  status: 'In development',
  url: 'https://northlease.ca',
  description:
    'A verified rental-housing platform built for anyone renting in North Bay, Ontario. Every landlord passes a two-step verification, an automated phone check plus a human-reviewed photo ID and selfie, before a listing goes live, so renters can trust what they are looking at from the first search.',
  differentiators: [
    'Two-step landlord verification: automated phone check + human-reviewed photo ID and selfie',
    'Perceptual-hash duplicate photo detection catches reused or stolen listing photos across listings',
    'Real Ontario map data, self-hosted rather than paying per-load fees to Google or Mapbox',
    'Distance-aware search, PostGIS answers "how far is this from downtown or campus" as a genuine geographic query',
  ],
  stack: 'Next.js 16, self-hosted on Hetzner via Coolify, Postgres (Neon) with PostGIS, Clerk auth, Cloudflare R2 for photos, MapLibre GL + Protomaps for self-hosted maps.',
};
