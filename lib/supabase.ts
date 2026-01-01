import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bqumxxrtoivpkehhzcil.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxdW14eHJ0b2l2cGtlaGh6Y2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczMDE2OTAsImV4cCI6MjA4Mjg3NzY5MH0.8OWRxeqnc_z-miHgklLAuhiaRg_OM8r-IBvbZhYq0fU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
