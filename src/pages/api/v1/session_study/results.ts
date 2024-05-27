import type { APIRoute } from "astro";
import type { SPB_FlashCard } from "@app/flashcards/models/schema";
import {updateListApi} from '@app/session/service'
export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const finished: SPB_FlashCard[] = body.session_finished

    const updatedList = await updateListApi(finished)

    console.log(updatedList)


    return new Response(JSON.stringify(updatedList))
};

