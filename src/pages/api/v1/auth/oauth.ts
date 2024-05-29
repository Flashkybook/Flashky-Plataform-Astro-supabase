import type { APIRoute } from "astro";
import { supabase } from "@shared/supabase";
import type { Provider } from "@supabase/supabase-js";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const formData = await request.formData();
  
    const provider = formData.get("provider")?.toString();
  
    const validProviders = ["google", "github", "discord"];
  
    if (provider && validProviders.includes(provider)) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
          redirectTo: "/api/v0/auth/OAuth"
        },
      });
  
      if (error) {
        return new Response(error.message, { status: 500 });
      }
      return  new Response(JSON.stringify(data), { status: 200 });
    }
    return new Response("provider no allowed", { status: 500 });
  
  
  };