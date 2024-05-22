import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase";
import { $user } from "@lib/db/user.store";
import  text_formatter  from "@/utils/text_formatter";
export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const userBookName = formData.get('new_user_book') as string;
    const userId = $user.get()?.id;

    const { data, error } = await supabase
        .from('user-book')
        .insert({ user_id: userId, name: text_formatter(userBookName) })
        .select();

    if (error) {
        return new Response(JSON.stringify({ error }), { status: 400 });
    }

    return redirect(`/app/books/${data[0].id}-${data[0].name}`);
};
