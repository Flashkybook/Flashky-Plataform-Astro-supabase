
import { useEffect, useState } from "preact/hooks";
import type { SPB_FlashCard } from "@env";

import { useStore } from '@nanostores/preact'
import { study_session } from "@/lib/db/nanostores/study";
import type { JSXInternal } from "node_modules/preact/src/jsx";


/**
* @TODO: 
* Cards UI
* carrusel of cards
* controls
* form Input expression
* validate answers
*/



const getFlashcards = () => {
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
        confirm("nueva session")
        return getFlashcards()
    }



    const newSession = () => {
        study_session.set({
            current: 0,
            flashcards: {
                list: [], finished: []
            }

        })
        confirm("session eliminada")
    }

    return (
        <div>
            <div class={"flex justify-between"}>
                <h1 class={"text-3xl font-bold mb-10"}>carrusel expressions</h1>

                <button onClick={newSession} class={"rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800"}>Nueva session</button>
            </div>

            <div class={"inline  "}>
                <div className="flex justify-center">
                    <Card card={study_session.get().flashcards.list[study_session.get().current]} />
                </div>

            </div>
        </div>
    );
}



// https://github.com/Flashkybook/old-app-frontend-next.js/blob/main/src/components/Games/InputGame.jsx
const Card = ({ card }: { card: SPB_FlashCard }) => {


    const nextCurrent = () => {
        console.log(study_session.get().current)
        if(study_session.get().current <= study_session.get().flashcards.list.length -1 ){
            study_session.setKey("current", study_session.get().current + 1)
        }else{
            study_session.setKey("current", 0)
            alert("restablece la session")
        }
    }

    const handleSubmit = (e: JSXInternal.TargetedSubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        nextCurrent()
    }

    return (

        <div class={"text-center flex flex-col justify-center p-8 bg-slate-700 rounded-3xl gap-y-6"}>
            {card.expression_name}
            <form onSubmit={e => handleSubmit(e)}>

                <input type="text" placeholder={"answer"} class={"w-full outline-none rounded-sm border-green-500 bg-slate-900 px-4"} name={"answer"} />
            </form>
        </div>
    )
}