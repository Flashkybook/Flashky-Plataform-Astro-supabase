import type { StudySession } from './schema'
import { persistentMap } from '@nanostores/persistent'



export const InitialState = {
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



