import { createClient } from '@supabase/supabase-js';

// BaaS backend: Supabase project (IE-I-SC_RCCIIT).
// Values can be overridden with Vite env vars; hardcoded fallbacks keep
// production builds working without extra configuration.
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://yuwwvbhlqzawahflrjas.supabase.co';
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_pbE6LMoi0nZ8881Mz4lQiA_t6EKOPlM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Build a public Storage URL for a stored path.
// Returns null for empty paths; passes through absolute URLs untouched.
export const storageUrl = (bucket, path) => {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const clean = String(path).replace(/^\/+/, '');
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${clean}`;
};
