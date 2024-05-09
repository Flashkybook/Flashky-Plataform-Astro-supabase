import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
    const authCode = url.searchParams.get("code");

    if (!authCode) {
        return new Response("No se proporcionó ningún código", { status: 400 });
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    const { access_token, refresh_token, expires_at } = data.session;



    cookies.set("sb-access-token", access_token, {
        path: "/",
    });
    cookies.set("sb-refresh-token", refresh_token, {
        path: "/",
    });
    
    // todo add verify at expire
    if (expires_at !== undefined) {
        cookies.set("sb-expires_at", expires_at.toString(), {
            path: "/",
        });
    }

    const { id, email, user_metadata, app_metadata, role, is_anonymous } = data.user;

    cookies.set(
        "user",
        { id, email, user_metadata, app_metadata, role, is_anonymous },
        {
            path: "/",
        },
    );

    return redirect("/app");
};