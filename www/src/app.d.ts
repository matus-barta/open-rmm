import { SupabaseClient, Session, type User } from '@supabase/supabase-js';
import { Database } from '$lib/database.types';

declare global {
	namespace App {
		interface Locals {
			supabaseServer: SupabaseClient<Database>;
			session: Session | null;
			user: User | null;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}
