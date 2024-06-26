import type { APIRoute } from "astro";
import { supabase } from "@shared/supabase";


export const DELETE: APIRoute = async ({ url}) => {


    const card_id = url.searchParams.get("card_id")
    // const expression_id = url.searchParams.get("expression_id")


    const { error: delete_error } = await supabase
        .from("flashcard")
        .delete()
        .eq("id", card_id);

    if (delete_error) {
        return new Response(JSON.stringify({
            message: "problema al eliminar", error: delete_error
        }), { status: 400 })
    }
    return new Response(JSON.stringify({
        message: "Libro Eliminado"
    }), { status: 200 })




};