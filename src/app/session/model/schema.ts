import type { FlashcardSession } from '@app/flashcards/models/schema'

export interface StudySession {
    // active: boolean
    current: any
    flashcards: FlashcardSession
}
