import { supabase } from "@shared/supabase";
import type { APIRoute } from "astro";
import type { Provider } from "@supabase/supabase-js";


export const POST: APIRoute = async ({ request, redirect, url }) => {
    const formData = await request.formData();

    const provider = formData.get("provider")?.toString();
    const validProviders = ["google", "github", "discord"];

    const getURL = () => {
        let host_url =
            import.meta?.env?.SITE_URL ?? // Automatically set by Vercel.
            url.origin
        // Make sure to include `https://` when not localhost.
        host_url = host_url.includes('http') ? host_url : `https://${host_url}`
        // Make sure to include a trailing `/`.
        host_url = host_url.charAt(host_url.length - 1) === '/' ? host_url : `${host_url}/`
        return host_url
    }


    if (provider && validProviders.includes(provider)) {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider as Provider,
            options: {
                redirectTo: getURL() + "/api/v0/auth/OAuth",
            }
            
        });

        if (error) {
            return new Response(error.message, { status: 500 });
        }
      
        // return new Response(JSON.stringify(
        //     { 
        //         url_provider: data.url,
        //         env_url: import.meta?.env?.SITE_URL,
        //         host_url: getURL(),
        //         url_astro: new URL(url.origin)
            
        //     },null,3)
        //     , { status: 200 });
 
        return redirect( data.url);
    } else {
        return new Response("Provider invalido", { status: 400 });
    }

}