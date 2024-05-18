import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";
import { $user } from '@lib/db/user.store'

// http://localhost:4321/api/v0/study/new_round
export const GET: APIRoute = async () => {
    // TODO: add query for book and type of session
    const user_data = $user.get();


    if (!user_data) {
        const { data: flashcards } = await supabase
            .from("flashcard")
            .select("*")
            .range(0, 0)
        return new Response(JSON.stringify(flashcards))

    }

    const { data: flashcards, error } = await supabase
        .from("flashcard")
        .select("*")
        .eq("user_own_id", user_data.id)
        .or("last_review.is.null,last_review.lt." + new Date().toISOString())
        .range(0, 1)

    if (!error && flashcards.length < 1) {
        // random list
        // CREATE VIEW random_flashcard AS SELECT * FROM flashcard ORDER BY RANDOM() LIMIT 1;
        const { data: flashcards } = await supabase
            .from("random_flashcard")
            .select("*")
            .eq("user_own_id", user_data.id)
            .range(0, 1)
        return new Response(JSON.stringify(flashcards))
    }

    return new Response(JSON.stringify(flashcards))
};

