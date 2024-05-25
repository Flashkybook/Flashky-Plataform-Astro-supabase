import type { SPB_FlashCard } from '@app/flashcards/models/schema'
import type { StudySession } from './schema'
import { persistentMap } from '@nanostores/persistent'

interface InitialState {
    current: {
        index: number
        correct: boolean
        error_message: string
    }
    flashcards: {
        list: SPB_FlashCard[]
        finished: SPB_FlashCard[]
        updated: SPB_FlashCard[] | undefined
    }
}


export const InitialState:InitialState = {
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

// Adapters

export const setNewSession = (list: SPB_FlashCard[]) => {
    const newState = InitialState;
    newState.flashcards.list = list;
    $session.set(newState);
}
