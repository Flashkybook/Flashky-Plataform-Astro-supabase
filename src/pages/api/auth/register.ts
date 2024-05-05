import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const provider = formData.get("provider")?.toString();




  if (!email || !password) {
    return new Response("Correo electrónico y contraseña obligatorios", { status: 400 });
  }

  const res = await supabase.auth.signUp({
    email,
    password,
  });

  if (res.error) {
    console.log(res.error)
    return new Response(res.error.message, { status: 500 });
  }

  return redirect("/sign-in");
};