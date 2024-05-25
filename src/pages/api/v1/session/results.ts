import type { APIRoute } from "astro";
import type { SPB_FlashCard } from "@app/flashcards/models/schema";

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const finished: SPB_FlashCard[] = body.session

    const updatedList: any[] = []


    return new Response(JSON.stringify(updatedList))
};

