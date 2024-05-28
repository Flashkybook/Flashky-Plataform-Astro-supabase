import type { APIRoute } from "astro";
import { supabase } from "@shared/supabase";


export const POST: APIRoute = async ({ params }) => {

    const { data, error: delete_error } = await supabase
        .from("user-book")
        .delete()
        .eq("id", params.userbook_id);

    if (delete_error) {
        return new Response(JSON.stringify({
            message: "error on delete" + delete_error.message
        })
        )
    } else {
        return new Response(JSON.stringify({
            message: "book delete"
        }), { status: 200 })
    }

};