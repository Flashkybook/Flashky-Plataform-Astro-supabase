import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";
import text_formatter from "@/utils/text_formatter";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    if(!formData.get("expression")) {
        return new Response(JSON.stringify({ message: "Expression is empty" }))
    }
    const expression =  text_formatter(formData.get("expression") as string)
    const user_book_id = formData.get("user_book_id");
    const user_book_name = formData.get("user_book_name");
    const user_id = formData.get("user_id");

    try {
        let expression_data: { id: string, name: string }
        const { data: new_expression, error: error_expression } = await supabase
            .from("expression")
            .insert({
                name: expression,
            })
            .select();

        if (error_expression) {
            if (error_expression.code === "23505") {
                // expression already exists
                console.log("expression")

                const { data: old_expression, error: error_old_expression } = await supabase
                    .from("expression")
                    .select()
                    .eq("name", expression)
                if (error_old_expression) {
                    return new Response(JSON.stringify({
                        message: "error en la creación de la expresión",
                    }))
                }
                expression_data = old_expression[0]

            } else {
                return new Response(JSON.stringify({
                    message: "error en la creación de la expresión",
                    error: error_expression

                }, null, 2), { status: 400 })
            }

        } else {
            expression_data = new_expression[0]
        }


        const {  error } = await supabase
            .from("flashcard")
            .insert({
                user_book_id: user_book_id,
                user_own_id: user_id,
                expression_id: expression_data.id,
                expression_name: expression_data.name,
            })
            .select();

        if (error) {
            console.log(error)
            return new Response(JSON.stringify({
                message: "error en la creación de la la flashcard",
                error: error

            }), { status: 400 })
        }
        return redirect(`/app/books/${user_book_id}-${user_book_name}`);


    } catch (error) {
        console.log("error")
        if (error instanceof Error) {
            console.error(error.message);
        }
        return new Response(JSON.stringify({
            message: "error al intentar crear"
        }), { status: 200 })
    }

    // console.log(expression, user_book_id, user_book_name);

};