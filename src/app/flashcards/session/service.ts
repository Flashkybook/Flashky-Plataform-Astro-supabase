import type { SPB_FlashCard } from "../models/schema";
import { supabase } from '@shared/supabase'
import practice from "./updateFlashcard";


/**
 * conditions for updating
 * 1.- next_review = today 
 * 2.- next_review < today and last_review != today // hoy no toca => solo se actualiza repeats and last review
 * 3.- last review = today  => solo se actualiza repeats
 */
export const updateListApi = async (list: SPB_FlashCard[]) => {
    const newList = await list.map(async (flashcard: SPB_FlashCard) => {
        const updatedList = practice(flashcard)
        const query = {} as any
        let debug = true
        const log_event = (message: any) => debug && console.log(message.toString().toUpperCase())
        if (new Date(flashcard.next_review).toLocaleDateString() == new Date().toLocaleDateString()) {
            log_event("first event! update all")
            query["last_review"] = new Date().toLocaleDateString()
            query["repetition"] = updatedList.repetition
            query["next_review"] = updatedList.next_review
            query["interval"] = updatedList.interval
            query["efactor"] = updatedList.efactor
        } else {
            log_event("third event! only update repeats")
            query["repetition"] = updatedList.repetition
            if (new Date(flashcard.last_review).toLocaleDateString() != new Date().toLocaleDateString()) {
                log_event("second event update repeats and last review")
                query["last_review"] = new Date().toLocaleDateString()
            }
        }
        const { data, error } = await supabase
            .from('flashcard')
            .update(query)
            .eq('id', flashcard.id)

        if (error) {
            console.error(error)
            return flashcard
        }
        return data
    })

    return await Promise.all(newList)
}

export const getFlashCardsByApi = async (user_id: string, debug:boolean|undefined) => {
    /**
   * 1.- no have user => get random flashcard and especifica number
   * 2.- flashcards next review is today
   * 3.- flashcards next review is not today => get flashcards by last review is not today
   * 4.- all flashcards last review is today => get all by random
   */
    const log_event = (message: any) => debug && console.log(message.toString().toUpperCase())
    console.log("HELLO WORD")
    if (!user_id) {
        log_event("1 event no user get random flashcard")
        const { data: flashcards } = await supabase
            .from("random_flashcard")
            .select("*")
            .range(0, 1)
        return flashcards
    }

    const today = new Date().toLocaleDateString()

    const { data, error: second_error } = await supabase
        .from("flashcard")
        .select("*")
        .eq("user_own_id", user_id)
        .or(`next_review.eq.${today},last_review.is.null,last_review.lt.${today}`)
        .range(0, 1)

    if (second_error) {
        console.log(second_error)
        // throw { "second error": second_error }
        return { error: second_error}
    }

    if (data.length > 0) {
        log_event("2 y 3 next review is today and last review is not today")
        return {data:data}
    } else {
        const { data: flashcards, error } = await supabase
            .from("random_flashcard")
            .select("*")
            .eq("user_own_id", user_id)
            .range(0, 1)
        log_event("4 event get all by random")

        if (error) {
            return { error: error}

        }
        return {data:data}
    }
    
}



