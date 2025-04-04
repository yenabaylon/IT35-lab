import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zcmmmbiikultmvbkhoua.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjbW1tYmlpa3VsdG12Ymtob3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MzcxMzcsImV4cCI6MjA1OTIxMzEzN30.FPE_xOxQ5HTvKM7dzRQRXgZr3CkgTC5_Q4GL_46fHmU';

export const supabase = createClient(supabaseUrl, supabaseKey);