import { supabase } from "@lib/supabase";
import type { APIRoute } from "astro";
import type { Provider } from "@supabase/supabase-js";


export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();

    const provider = formData.get("provider")?.toString();
    const validProviders = ["google", "github", "discord"];

    if (provider && validProviders.includes(provider)) {
        console.log(provider)
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider as Provider,
            options: {
                redirectTo: "http://localhost:4321/api/auth/v0/OAuth",
            },
        });

        if (error) {
            return new Response(error.message, { status: 500 });
        }

        return redirect(data.url);
    }else{
        return new Response("Provider invalido", { status: 400 });
    }

}