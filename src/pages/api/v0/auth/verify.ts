import type { APIRoute } from "astro";
import { supabase } from '@lib/supabase'
import { $user } from '@lib/db/user.store'
export const GET: APIRoute = async ({ cookies, redirect }) => {

  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");

  if (!accessToken || !refreshToken) {
    return redirect("/login");
  }

  const {data, error } = await supabase.auth.setSession({
    refresh_token: refreshToken.value,
    access_token: accessToken.value,
  });

  if (error) {
    cookies.delete("sb-access-token", {
      path: "/",
    });
    cookies.delete("sb-refresh-token", {
      path: "/",
    });
    return redirect("/login");

  }

  console.log(data)

  return new Response(JSON.stringify({ user: $user.get() }));
};