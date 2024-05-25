import { supabase } from '@shared/supabase';
import type { APIContext, AstroCookies } from 'astro'
import type { Session } from '@supabase/supabase-js'


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
        console.log("CODIGO EXPIRADO")
        return context.redirect("/");
    }
    saveTokenSession(context.cookies, data.session)

    return data.user
}

