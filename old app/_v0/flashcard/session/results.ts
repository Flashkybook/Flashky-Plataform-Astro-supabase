import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";
import practice from "@lib/flashcard/practice";
import type { SPB_FlashCard } from "@/lib/flashcard/flashcard.schema";
export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();

    /**
     * conditions for updating
     * 1.- next_review = today 
     * 2.- next_review < today and last_review != today // hoy no toca => solo se actualiza repeats and last review
     * 3.- last review = today  => solo se actualiza repeats
     */
    const newList = await body.session.map(async (flashcard: SPB_FlashCard) => {
        const updatedList = practice(flashcard)


        const query = {} as any
        let debug = true
        const log_event = (message:any)=> debug && console.log(message.toString().toUpperCase())
        
        if (new Date(flashcard.next_review).toLocaleDateString() == new Date().toLocaleDateString()) {
            log_event("first event! update all")
            query["last_review"] = new Date().toLocaleDateString()
            query["repetition"] = updatedList.repetition
            query["next_review"] = updatedList.next_review
            query["interval"] = updatedList.interval
            query["efactor"] = updatedList.efactor
        } else {
            log_event("third event! only update repeats")
            query["repetition"] = updatedList.repetition
            if (new Date(flashcard.last_review).toLocaleDateString() != new Date().toLocaleDateString()) {
                log_event("second event update repeats and last review")
                query["last_review"] = new Date().toLocaleDateString()
            }
        }


        const { data, error } = await supabase
            .from('flashcard')
            .update(query)
            .eq('id', flashcard.id)

        if (error) {
            console.error(error)
            return flashcard
        }
        return data
    })


    return new Response(JSON.stringify(newList))
};

