import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";
import practice from "@/lib/practice";
import type { SPB_FlashCard } from "@env";
export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();

    const updatedList = body.session.map((flashcard: SPB_FlashCard) => practice(flashcard))

    for (let i = 0; i < updatedList.length; i++) {
        const element = updatedList[i];
        if (new Date(element.last_review).toLocaleDateString() != new Date().toLocaleDateString()) {
            console.log("datos actualizados en la base de datos")
            await supabase
                .from('flashcard')
                .update(
                    {
                        last_review: element.last_review,
                        next_review: element.next_review,
                        repetition: element.repetition,
                        interval: element.interval,
                        efactor: element.efactor,
                    }
                )
                .eq('id', element.id)
        }

    }

    return new Response(JSON.stringify(updatedList))
};

