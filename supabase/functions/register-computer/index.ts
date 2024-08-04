// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient, CustomAuthError } from "jsr:@supabase/supabase-js@2";
import type { Database } from "../_shared/database.types.ts";

Deno.serve(async (req) => {
  try {
    const { one_time_key } = await req.json();

    if (!one_time_key) throw "Missing OTK in request.";
    if (String(one_time_key).length != 64) throw "Wrong length";

    const supabase = createClient<Database>(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
      }
    );

    const { data: computer, error } = await supabase
      .from("computers")
      .select("*")
      .eq("one_time_key", one_time_key)
      .limit(1)
      .single();
    if (error) {
      if (error.code == "PGRST116") throw "OTK not found in Computers";
      else throw error;
    }

    if (!computer) throw "OTK not found in Computers";

    if (computer.is_allowed && !computer.is_added) {
      const { data, error } = await supabase
        .from("computers")
        .update({ is_added: true })
        .eq("uuid", computer.uuid);
      if (error) {
        throw error;
      }

      console.log(`Registered ${computer.uuid}`);

      return new Response(JSON.stringify({ uuid: computer.uuid }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      throw "Computer not allowed or already registered!";
    }
  } catch (err) {
    if (typeof err == typeof CustomAuthError) {
      console.error(err?.message ?? err);
      return new Response(String(err?.message ?? err), { status: 500 });
    } else {
      console.error(err?.message ?? err);
      return new Response(String(err?.message ?? err), { status: 400 });
    }
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/register-computer' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
