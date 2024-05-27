import type { APIRoute } from "astro";
import { supabase } from "@shared/supabase";
import  text_formatter  from "@shared/utils/text_formatter";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const userBookName = formData.get('new_user_book') as string;
    const userId = formData.get('user_id') as string;

    const { data, error } = await supabase
        .from('user-book')
        .insert({ user_id: userId, name: text_formatter(userBookName) })
        .select();

    if (error) {
        return new Response(JSON.stringify({ error }), { status: 400 });
    }
    console.log(data, "libro creado")

    return redirect(`/app/books/${data[0].id}-${data[0].name}`);
};
