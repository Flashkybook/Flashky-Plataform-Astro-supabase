import type { APIRoute } from "astro";
import { saveUser } from "@lib/db/user.controller";

export const GET: APIRoute = async (params) => {
    return saveUser(params);
};  