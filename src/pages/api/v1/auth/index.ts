import type { APIRoute } from "astro";
import { supabase } from '@shared/supabase'



export const GET: APIRoute = async ({ cookies, redirect }) => {
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");
  const expiresAt = cookies.get("sb-expire-token");



  // const {data, error } = await supabase.auth.setSession({
  //   refresh_token: refreshToken.value,
  //   access_token: accessToken.value,
  // });

  const session = refreshToken && { refresh_token: refreshToken?.value as string, }

  const { data, error } = await supabase.auth.refreshSession(session);

  if (error && data.user) {
    console.log(error)
    cookies.delete("sb-access-token", {
      path: "/",
    });
    cookies.delete("sb-refresh-token", {
      path: "/",
    });
    return new Response(error.message, { status: 400 });
  }

  const { id, user_metadata, role, is_anonymous } = data.user as any;


  return new Response(JSON.stringify({ user: "$user.get()" }));
};