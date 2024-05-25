import { supabase } from "@lib/supabase";
import { $user } from "@lib/user/user.store";
import { $session, InitialState } from "./flashcard.store";
import type { SPB_FlashCard } from "./flashcard.schema";

const userData = $user.get();

export const newSession = async() => {
    await fetch("/api/v0/study/new_session")
        .then((res) => res.json())
        .then((res: SPB_FlashCard[]) => {
            $session.setKey("flashcards", {...InitialState.flashcards, list: res})
        });
}


// !TODO Match the filter  https://supabase.com/docs/reference/javascript/filter
export const getFlashCards = async (userIdBook?: number) => {
  const query = supabase
    .from("flashcard")
    .select("*");

  if (userIdBook) {
    query
      .eq("user_book_id", userIdBook)
      .order("updated_at", { ascending: false });
  } else {
    const userId = userData?.id;
    if (userId) {
      query.eq("user_own_id", userId).order("next_review", { ascending: false });
    }
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data as SPB_FlashCard[];
}
