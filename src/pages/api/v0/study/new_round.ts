import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";

// http://localhost:4321/api/v0/study/new_round
export const GET: APIRoute = async ({ cookies, locals }) => {
    // TODO: add query for book and type of session

    const user_data = cookies.get("user");
    const user = user_data?.json()



    const { data: flashcards, error } = await supabase
        .from("flashcard")
        .select("*")
        .eq("user_own_id", user.id)
        .or("last_review.is.null,last_review.lt." + new Date().toISOString())
        .range(0, 4)

  
    return new Response(JSON.stringify(flashcards))
};

