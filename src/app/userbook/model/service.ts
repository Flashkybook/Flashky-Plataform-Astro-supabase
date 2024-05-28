import { supabase } from "@shared/supabase";
import type {SPB_UserBook } from "./schema"


export const serviceGetUserBookList = async (user_id: number) => {
    const { data, error } = await supabase
        .from("user-book")
        .select("*")
        .eq("user_id", user_id);

    if (error) {
        console.log(error)
        throw error;
    }

    return data as SPB_UserBook[];
}
