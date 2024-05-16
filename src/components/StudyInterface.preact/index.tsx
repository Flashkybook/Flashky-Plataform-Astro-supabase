

import { $session, newSession } from "@lib/db/nanostores/study.store";
import  Card  from "./Card";
import ListReview from "./ListReview";
import { useEffect } from "preact/hooks";

/**
* @TODO: 
* Cards UI
* carrusel of cards
* controls
* form Input expression
* validate answers
*/




/**
 * @returns carrusel of cards*/
export default function Study() {

   

    useEffect(() => {
        if ($session.get().flashcards.list.length < 1) {
            newSession()
    
        }
        
    },[$session])
    return (
        <div >
            <div class={"flex justify-between"}>
                <h1 class={"text-3xl font-bold mb-10"}>carrusel expressions</h1>

                <button onClick={newSession} class={"rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800"}>Nueva session</button>
            </div>

            <div class={"inline  "}>
                <div className="flex justify-center">
                    <Card />
                </div>

            </div>

            <ListReview/>

        </div>
    );
}




