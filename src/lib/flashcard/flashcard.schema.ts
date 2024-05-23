
/**
 * Flashcard
 * @param repetition number of repetitions in this days of streak
 * @param efactor number that represents the easiness factor
 * @param interval number that represents next day of review
 */
export interface SPB_FlashCard   {
    id: number,
    created_at: string,
    user_book_id: 23,
  
    expression_id: number,
    expression_name: string,
    user_own_id: string
  
    fails: number,
  
    interval: number,
    repetition: number,
    efactor: number,
    last_review: string,
    next_review: string,
  }
export interface FlashcardSession {
    list: SPB_FlashCard[],
    finished: SPB_FlashCard[],
    updated: SPB_FlashCard[] | undefined,
}

export interface StudySession {
    // active: boolean
    current: any
    flashcards: FlashcardSession
}

