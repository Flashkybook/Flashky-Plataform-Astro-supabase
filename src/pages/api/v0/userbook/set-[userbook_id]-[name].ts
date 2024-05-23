import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";
import  text_formatter  from "@lib/utils/text_formatter";

export const POST: APIRoute = async ({ params, redirect }) => {
    const { userbook_id, name } = params;
    const formattedName = text_formatter(name as string);


    const { data, error } = await supabase
        .from('user-book')
        .update({ name: formattedName })
        .eq("id", userbook_id)
        .select();

    if (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Failed to update user book"
        }), { status: 400 });
    }

    // return redirect("/app/books/" + userbookId + "-" + formattedName);
    
    return new Response(JSON.stringify({
        message: "User book updated successfully",
        data
    }));
};
