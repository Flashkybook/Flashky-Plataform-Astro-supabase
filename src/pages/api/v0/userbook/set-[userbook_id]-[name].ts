import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";

export const POST: APIRoute = async ({ params }) => {
    const { data, error } = await supabase
        .from('user-book')
        .update({ name: params.name })
        .eq("id", params.userbook_id)
        .select()

    if (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Libro no agregado" + error
        }), { status: 400 })
    }
    if (data) {
        console.log("success", data);
    }

    return new Response(JSON.stringify({
        message: "Libro Actualizado" + data
    }))
};