import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";
import { $user } from "@lib/user/user.store";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Correo electrónico y contraseña obligatorios", { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

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

  const { id, user_metadata, role, is_anonymous } = data.user;

  $user.set({ id, user_name: user_metadata.user_name, role: role!, is_anonymous: is_anonymous ? true : false },
  );
  return redirect("/app");
};