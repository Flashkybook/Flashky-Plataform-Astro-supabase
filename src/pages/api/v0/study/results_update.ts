import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";
import practice from "@lib/flashcard/practice";
import type { SPB_FlashCard } from "@/lib/flashcard/flashcard.schema";
export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();

    const newList = await body.session.map(async (flashcard: SPB_FlashCard) => {
        const updatedList = practice(flashcard)
        console.log(flashcard)
        if (new Date(flashcard.last_review).toLocaleDateString() != new Date().toLocaleDateString()) {
            const { data, error } = await supabase
                .from('flashcard')
                .update(
                    {
                        last_review: new Date(),
                        next_review: updatedList.next_review,
                        repetition: updatedList.repetition,
                        interval: updatedList.interval,
                        efactor: updatedList.efactor,
                    }
                )
                .eq('id', flashcard.id)
            console.log(data, error)
            if (error) {
                return flashcard
            }
            return data
        }
    })


    return new Response(JSON.stringify(newList))
};

