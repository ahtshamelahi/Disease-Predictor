// supabase.js — Supabase Configuration

const SUPABASE_URL = "https://puyqtlyfcjqpvazpihck.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1eXF0bHlmY2pxcHZhenBpaGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzOTI0NjgsImV4cCI6MjA5Mzk2ODQ2OH0.Hgr_3bgVpyd38__f12Fp731yJxPcdiH-E6Eqia2UOj8";


const { createClient } = supabase;
window.supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
