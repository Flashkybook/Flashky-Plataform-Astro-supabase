import type { SPB_FlashCard } from '@env'
import { persistentMap } from '@nanostores/persistent'

// https://github.com/nanostores/persistent


/**
 * persistencia de datos
 * manejo de estado de flashcards
 * sincronía con la base de datos supabase
 * Manejo de Nueva o rescatar la session
 * 
 * @round: session de estudio que persiste, guardada en local storage o base de datos
 * * current: numero de flashcard actual, 
 * * flashcards: flashcard_data, flashcard_try
 */

interface FlashcardSession {
    list: SPB_FlashCard[],
    finished: SPB_FlashCard[],
}

interface StudySession {
    // active: boolean
    current: number
    flashcards: FlashcardSession 
}


export const study_session = persistentMap('study_session:', <StudySession>{
    current: 0,
    flashcards: {
        list: [],
        finished: [],
    }
}, {
    encode: JSON.stringify,
    decode: JSON.parse,
})