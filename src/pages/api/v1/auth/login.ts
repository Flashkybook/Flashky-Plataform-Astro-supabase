import { supabase } from "@shared/supabase";
import type { APIRoute } from "astro";
import type { Provider } from "@supabase/supabase-js";





export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const provider = formData.get("provider")?.toString();
    const validProviders = ["google", "github", "discord"];
    if (provider && validProviders.includes(provider)) {    
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider as Provider,
        });

        if (error) {
            return new Response(error.message, { status: 500 });
        }
        
        return  Response.redirect(data.url);
    } else {
        return new Response("Provider invalido", { status: 400 });
    }

}