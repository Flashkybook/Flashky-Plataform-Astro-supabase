import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";
import { $user } from '@/lib/db/nanostores/user.store'

// http://localhost:4321/api/v0/study/new_round
export const GET: APIRoute = async ({ cookies, locals, redirect }) => {
    // TODO: add query for book and type of session
    const user_data = $user.get();
    if (!user_data) {return new Response("usuario no autenticado", { status: 400 });}

    const { data: flashcards, error } = await supabase
        .from("flashcard")
        .select("*")
        .eq("user_own_id", user_data.id)
        .or("last_review.is.null,last_review.lt." + new Date().toISOString())
        .range(0, 4)

    return new Response(JSON.stringify(flashcards))
};

