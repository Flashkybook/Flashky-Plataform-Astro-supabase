import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {

    const formData = await request.formData();

    const user_book_name = formData.get("name_userbook");
    const user_id = formData.get("user_id");
  
    if (user_book_name === "") {
        return redirect(`/app`);
        throw new Error("Expression is empty");

    }
    try {
        const { data: res, error } = await supabase
        .from("user-book")
        .insert({
            user_id: user_id,
            name: user_book_name,
        })
        .select();
     
    } catch (error) {

        if (error instanceof Error) {
            console.error(error.message);
        }
    }

    // console.log(expression, user_book_id, user_book_name);
    return redirect(`/app/books/`);
};