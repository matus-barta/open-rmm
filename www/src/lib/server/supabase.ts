import { createClient } from '@supabase/supabase-js';
import { SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/database.types';

export const supabaseServiceClient = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE_KEY);
