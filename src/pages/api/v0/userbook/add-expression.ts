import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {

    const formData = await request.formData();
    const expression = formData.get("expression");
    const user_book_id = formData.get("user_book_id");
    const user_book_name = formData.get("user_book_name");
    try {
        if (expression === "") {
        }
        const { data: new_expression, error: error_expression } = await supabase
            .from("expression")
            .insert({
                name: expression,
            })
            .select();
        if (error_expression) {
            throw error_expression;
        }

        const { data: new_card, error } = await supabase
            .from("card_expression")
            .insert({
                user_book_id: user_book_id,
                expression_id: new_expression[0].id,
            })
            .select();

    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }

    console.log(expression, user_book_id, user_book_name);
    return redirect(`/dashboard/books/${user_book_id}-${user_book_name}`);
};