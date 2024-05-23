import { supabase } from '@lib/supabase';
import { $user } from '@lib/user/user.store';
import type { APIContext } from 'astro'

export const saveUser = async (context: APIContext) => {
    const authCode = context.url.searchParams.get("code");

    if (!authCode) {
        return new Response("No se proporcionó ningún código", { status: 400 });
    }
    const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);
    if (error) {
        return new Response(error.message, { status: 500 });
    }
    const { access_token, refresh_token, expires_at } = data.session;
    context.cookies.set("sb-access-token", access_token, {
        path: "/",
    });
    context.cookies.set("sb-refresh-token", refresh_token, {
        path: "/",
    });
    // todo add verify at expire
    if (expires_at !== undefined) {
        context.cookies.set("sb-expires_at", expires_at.toString(), {
            path: "/",
        });
    }
    const { id, user_metadata, role, is_anonymous } = data.user;

    $user.set({ id, user_name: user_metadata.user_name, role: role!, is_anonymous: is_anonymous },
    );

    return context.redirect("/app");
}
