import type { SPB_FlashCard } from '@env'
import { persistentMap } from '@nanostores/persistent'

// https://github.com/nanostores/persistent
// https://github.com/nanostores
// https://github.com/nanostores/preact

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
    current: any
    flashcards: FlashcardSession
}
// function() {
//     fetch("/api/v0/study/new_round")
//         .then((res) => res.json())
//         .then((res: SPB_FlashCard[]) => {
//             study_session.setKey("flashcards", { list: res, finished: [] })
//         });  
// },

export const study_session = persistentMap('study_session:', <StudySession>{
    current: {
        index: 0,
        incorrect: false
    },
    flashcards: {
        list: [],
        finished: [],
    }
}, {
    encode: JSON.stringify,
    decode: JSON.parse,
})