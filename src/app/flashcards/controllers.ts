import { supabase } from "@shared/supabase";
import type { SPB_FlashCard } from "./models/schema";
// import { $session, InitialState } from "./session/model/store";


export const getFlashCards = async ({ userBookId, userId }: { userBookId?: string | undefined, userId: string | undefined }) => {
  // !TODO Match the filter  https://supabase.com/docs/reference/javascript/filter
  const query = supabase
    .from("flashcard")
    .select("*");

  if (userBookId) {
    query
      .eq("user_book_id", userBookId)
      .order("updated_at", { ascending: false });
  } else if (userId) {
    query.eq("user_own_id", userId).order("next_review", { ascending: false });
  }
  const { data, error } = await query;
  if (error) {
    throw error;
  }

  return data as SPB_FlashCard[];
}
