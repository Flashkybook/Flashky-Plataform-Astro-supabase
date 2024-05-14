import type { APIRoute } from "astro";
import {$user} from '@/lib/db/nanostores/user.store'
export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  cookies.delete("user", { path: "/" });
  $user.set(undefined);
  return redirect("/");
};