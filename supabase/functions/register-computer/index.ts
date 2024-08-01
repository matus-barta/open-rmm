// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    const { one_time_key } = await req.json();
    if (!one_time_key)
      return new Response("Missing OTK in request.", { status: 400 });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const { data, error } = await supabase
      .from("computers")
      .select("*")
      .eq("one_time_key", one_time_key)
      .limit(1)
      .single();
    if (error) {
      throw error;
    }

    if (!data)
      return new Response("OTK not found in Computers", { status: 400 });

    if (data.is_allowed && !data.is_added) {
      const { data, error } = await supabase
        .from("computers")
        .update({ is_added: true })
        .eq("uuid", data.uuid);
      if (error) {
        throw error;
      }
      return new Response(JSON.stringify(data.uuid), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }
  } catch (err) {
    return new Response(String(err?.message ?? err), { status: 500 });
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
