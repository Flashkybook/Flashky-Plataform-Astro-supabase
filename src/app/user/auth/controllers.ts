import { supabase } from '@shared/supabase';
import type { APIContext, AstroCookies } from 'astro'
import type { Session } from '@supabase/supabase-js'
import { adapterResSupabaseAuth_to_store } from "../model/store";
import type { User } from '@supabase/supabase-js'


/**
 * Sets the access and refresh tokens as cookies in the API context.
 * @param {APIContext} context - The API context.
 */
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
    const accessToken = context.cookies.get("sb-access-token");
    const refreshToken = context.cookies.get("sb-refresh-token");
    // const expiresAt = context.cookies.get("sb-expire-token");
    const session = { refresh_token: refreshToken?.value as string, }
    const { data, error } = await supabase.auth.refreshSession(session);
    if (error && data.user) {
        console.log(error)
        context.cookies.delete("sb-access-token", {
            path: "/",
        });
        context.cookies.delete("sb-refresh-token", {
            path: "/",
        });
        context.redirect("/");
        return  undefined
        
    }
    const user = adapterResSupabaseAuth_to_store(data.user as User)
    return user

}
