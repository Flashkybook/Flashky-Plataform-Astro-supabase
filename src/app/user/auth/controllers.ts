import { supabase } from '@shared/supabase';
import type { APIContext, APIRoute, AstroCookies } from 'astro'
import type { Provider, Session } from '@supabase/supabase-js'
import { adapterResSupabaseAuth_to_store } from "../model/store";
import type { User } from '@supabase/supabase-js'


export default function saveTokenSession(cookies: AstroCookies, session: Session) {
    cookies.set("sb-access-token", session.access_token, {
        path: "/",
    });
    cookies.set("sb-refresh-token", session.refresh_token, {
        path: "/",
    });
    if (session.expires_at) {
        cookies.set("sb-expires_at", session.expires_at?.toString(), {
            path: "/",
        });
    }
}


export const getUserFromAuthCode = async (context: APIContext) => {
    const authCode = context.url.searchParams.get("code");
    if (!authCode) {
        throw ("auth code not found " + authCode);
    }
    const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);
    if (error) {
        context.redirect("/");
        return undefined
    }
    saveTokenSession(context.cookies, data.session)
    const user = adapterResSupabaseAuth_to_store(data.user as User)
    return user

}


export const getUserSsr = async (context: APIContext) => {
  
    // const { data, error } = await supabase.auth.refreshSession(); 
    const { data, error } = await supabase.auth.getUser(); 
  
    if (error) {
        console.log(error)
        context.redirect("/");
        
        return undefined
    }

    const user = adapterResSupabaseAuth_to_store(data.user as User)
    return user

}

//  Api controllers
export const OAuthSupabase: APIRoute = async ({ request }) => {
    const formData = await request.json();
    const provider = formData.provider
    const validProviders = ["google", "github", "discord"];

    if (provider && validProviders.includes(provider)) {    
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider as Provider,
        });

        if (error) {
            return new Response(error.message, { status: 500 });
        }
        return new Response(JSON.stringify(data), { status: 200 });
    } else {
        console.log("data")

        return new Response("Provider invalido", { status: 400 });
    }

}