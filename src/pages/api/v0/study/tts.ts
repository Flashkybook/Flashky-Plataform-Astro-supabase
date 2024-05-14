import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";


export const GET: APIRoute = async ({ cookies, locals }) => {
    // TODO: add query for book and type of session


   
    return new Response(JSON.stringify(locals))
};

