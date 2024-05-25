import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";
import { $user } from '@lib/user/user.store'

// http://localhost:4321/api/v0/study/new_round
export const GET: APIRoute = async () => {
    const user_data = $user.get();
    /**
     * 1.- no have user => get random flashcard and especifica number
     * 2.- flashcards next review is today
     * 3.- flashcards next review is not today => get flashcards by last review is not today
     * 4.- all flashcards last review is today => get all by random
     */
    let debug = true
    const log_event = (message: any) => debug && console.log(message.toString().toUpperCase())
    if (!user_data) {
        log_event("1 event no user get random flashcard")
        const { data: flashcards } = await supabase
            .from("random_flashcard")
            .select("*")
            .range(0, 1)
        return new Response(JSON.stringify(flashcards))
    }

    const today = new Date().toLocaleDateString()
    const { data, error: second_error } = await supabase
        .from("flashcard")
        .select("*")        
        .or(`next_review.eq.${today},last_review.is.null,last_review.lt.${today}`)
        .range(0, 1)

    if (second_error) {
        console.log(second_error)
        throw { "second error": second_error }
    }
    if (data.length > 0) {
        log_event("2 y 3 next review is today and last review is not today")
        console.log(data[0].next_review, today)
        return new Response(JSON.stringify(data))
    } else {
        const { data: flashcards, error } = await supabase
            .from("random_flashcard")
            .select("*")
            .eq("user_own_id", user_data.id)
            .range(0, 1)
        log_event("4 event get all by random")

        if (error) {
            throw { "4 event error": error }
        }
        return new Response(JSON.stringify(flashcards))
    }


};

