

import { $session, newSession } from "@lib/db/session.store";
import Card from "./Card";
import { useEffect } from "preact/hooks";
import { useStore } from '@nanostores/preact'

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

    const session = useStore($session)

    useEffect(() => {
        if (session.flashcards.list.length < 1) {
            newSession()
        }
    }, [$session])
    return (
        <div class="flex sm:flex-col flex-col-reverse">

            <div className="flex justify-between flex-col gap-2 sm:flex-row">

                <a href={"/app"} class="btn-tonal relative flex flex-row items-center justify-center gap-x-2 py-1.5 px-4 rounded-[6.25rem] text-sm tracking-[.00714em] font-medium hover:shadow bg-secondary-100 text-primary-900 dark:bg-secondary-700 dark:text-secondary-100">
                    <span class="material-symbols-outlined">
                        arrow_back_ios
                    </span>
                    volver
                </a>

                <button onClick={newSession} class="btn-tonal relative flex flex-row items-center justify-center gap-x-2 py-1.5 px-4 rounded-[6.25rem] text-sm tracking-[.00714em] font-medium hover:shadow bg-secondary-100 text-primary-900 dark:bg-secondary-700 dark:text-secondary-100">
                    <span class="material-symbols-outlined">
                        info
                    </span>
                    Nueva session
                </button>

            </div>

            <div className="flex justify-around  items-center py-24">
                {session.flashcards.list.length > 0 &&
                    <Card />
                }
            </div>


        </div>



    );
}




