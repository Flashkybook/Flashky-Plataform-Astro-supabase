import type { APIRoute } from "astro";
import { supabase } from "@shared/supabase";
import { getFlashCardsByApi } from "@app/session/service";
// http://localhost:4321/api/v0/study/new_round
export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const user_id = body.user_id
    


    const data = await getFlashCardsByApi(user_id, true)

    return new Response(JSON.stringify(data))

};

