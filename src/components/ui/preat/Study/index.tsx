
import { useEffect, useState } from "preact/hooks";

import type { SPB_FlashCard } from "@env";
import { useStore } from '@nanostores/preact'
import { study_session } from "@lib/db/nanostores/studyStore";
import type { JSXInternal } from "node_modules/preact/src/jsx";


/**
* @TODO: 
* Cards UI
* carrusel of cards
* controls
* form Input expression
* validate answers
*/



const newSession = () => {
    fetch("/api/v0/study/new_round")
        .then((res) => res.json())
        .then((res: SPB_FlashCard[]) => {
            study_session.setKey("flashcards", { list: res, finished: [] })
        });
}

/**
 * @returns carrusel of cards*/
export default function Study() {

    if (study_session.get().flashcards.list.length < 1) {
        newSession()
    }
    return (
        <div>
            <div class={"flex justify-between"}>
                <h1 class={"text-3xl font-bold mb-10"}>carrusel expressions</h1>

                <button onClick={newSession} class={"rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800"}>Nueva session</button>
            </div>

            <div class={"inline  "}>
                <div className="flex justify-center">
                    <Card />
                </div>

            </div>
        </div>
    );
}



// https://github.com/Flashkybook/old-app-frontend-next.js/blob/main/src/components/Games/InputGame.jsx
const Card = () => {
    const session = useStore(study_session)
    const current_card: SPB_FlashCard = session.flashcards.list[session.current.index]
 


    const nextCurrent = () => {

        // remove from flashcards.list and add to flashcards.finished
        if (session.current.incorrect == false) {
            session.flashcards.finished.push(session.flashcards.list[session.current.index])
            session.flashcards.list.splice(session.current.index, 1)
            study_session.set({
                flashcards: {
                    list: session.flashcards.list,
                    finished: session.flashcards.finished
                },
                current: {
                    index: session.current.index,
                    incorrect: false
                }
            })
            session.flashcards = study_session.get().flashcards
            console.log(session.flashcards)
            if(session.flashcards.list.length < 1){
                window.location.href = "/app/study/results";                
            }

        } else {
            if (session.current.index == session.flashcards.list.length - 1) {
                study_session.setKey("current", {
                    index: 0,
                    incorrect: false
                },)
            } else {
                study_session.setKey("current", {
                    index: session.current.index + 1,
                    incorrect: false
                },

                )
            }
        }

    }


    const handleSubmit = (e: JSXInternal.TargetedSubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const answer = e.currentTarget.getElementsByTagName("input")[0].value


        // // Manejo de correcto o incorrecto
        if (answer == current_card.expression_name) {
            nextCurrent()

        } else if (session.current.incorrect = false) {
            session.current.incorrect = true
            session.flashcards.list[session.current.index].repeats = session.flashcards.list[session.current.index].repeats + 1
        }
        e.currentTarget.reset()

    }


    return (

        <div class={"text-center flex flex-col justify-center p-8 bg-slate-700 rounded-3xl gap-y-6"}>
            {current_card.expression_name}
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" placeholder={"answer"} class={"w-full outline-none rounded-sm border-green-500 bg-slate-900 px-4"} name={"answer"} />
            </form>
        </div>
    )
}