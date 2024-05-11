import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";


export const POST: APIRoute = async ({ params, request, cookies, redirect }) => {

    const { data, error: delete_error } = await supabase
        .from("user-book")
        .delete()
        .eq("id", params.userbook_id);

    console.log(data, delete_error)
    if (delete_error) {
        return new Response(JSON.stringify({
            message: "problema al eliminar" + delete_error.message
        })
        )
    } else {
        return new Response(JSON.stringify({
            message: "Libro Eliminado"
        }), { status: 200 })
    }

};