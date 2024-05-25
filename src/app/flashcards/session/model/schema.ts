import type { FlashcardSession } from '../../models/schema'

export interface StudySession {
    // active: boolean
    current: any
    flashcards: FlashcardSession
}
