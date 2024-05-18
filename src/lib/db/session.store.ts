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
    updated: SPB_FlashCard[] | undefined,
}

interface StudySession {
    // active: boolean
    current: any
    flashcards: FlashcardSession
}

const InitialState = {
    current: {
        index: 0,
        correct: true,
        error_message: ""
    },
    flashcards: {
        list: [],
        finished: [],
        updated: undefined,
    }
}

export const $session = persistentMap('session', <StudySession>InitialState, {
    encode: JSON.stringify,
    decode: JSON.parse,
})


export const newSession = async() => {
    await fetch("/api/v0/study/new_session")
        .then((res) => res.json())
        .then((res: SPB_FlashCard[]) => {
            $session.setKey("flashcards", {...InitialState.flashcards, list: res})
        });
}