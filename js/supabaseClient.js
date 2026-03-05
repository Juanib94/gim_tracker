// js/supabaseClient.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔴 Replace these with your actual project values
const supabaseUrl = 'https://kllhyspdvdtstweescnb.supabase.co'
const supabaseAnonKey = 'sb_publishable_lyBaSG0ZyklOA27VKsW-PA_rNgBGW5v'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)