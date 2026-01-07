
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://svqhgexxgxdjbowvphpn.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.warn('Missing VITE_SUPABASE_ANON_KEY. Please check your .env file.');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey || ''
);
