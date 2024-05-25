

import { $session, InitialState } from "@lib/flashcard/flashcard.store";
import Card from "./Card";
import { useEffect, useState } from "preact/hooks";
import { useStore } from '@nanostores/preact'
import type { SPB_FlashCard } from "@lib/flashcard/flashcard.schema";
import ItemListFlashcard from "@components/ItemListFlashcard.astro";


const newSession = async () => {
    await fetch("/api/v0/flashcard/session/new")
        .then((res) => res.json())
        .then((res: SPB_FlashCard[]) => {
            console.log(res)
            $session.setKey("flashcards", { ...InitialState.flashcards, list: res })
        })
}

export default function Study() {
    const [testMode, setTestMode] = useState(false)

    const session = useStore($session)

    useEffect(() => {
        console.log(session.flashcards.list, $session.get().flashcards.list)
        if (session.flashcards.list.length < 1) {
            newSession().then(() => {
                confirm("nueva session creada")
            })
        }
    }, [$session])
    console.log(session.flashcards.list)
    return (
        <div class="flex sm:flex-col flex-col-reverse h-[80vh] justify-around">

            <div className="flex justify-between flex-col gap-2 sm:flex-row">

                <a href={"/app"} class="btn-tonal relative flex flex-row items-center justify-center gap-x-2 py-1.5 px-4 rounded-[6.25rem] text-sm tracking-[.00714em] font-medium hover:shadow bg-secondary-100 text-primary-900 dark:bg-secondary-700 dark:text-secondary-100">
                    <span class="material-symbols-outlined">
                        arrow_back_ios
                    </span>
                    volver
                </a>

                <button onClick={() => newSession().then(() => {
                    return confirm("nueva session creada")
                })}
                    class="btn-tonal relative flex flex-row items-center justify-center gap-x-2 py-1.5 px-4 rounded-[6.25rem] text-sm tracking-[.00714em] font-medium hover:shadow bg-secondary-100 text-primary-900 dark:bg-secondary-700 dark:text-secondary-100">
                    <span class="material-symbols-outlined">
                        info
                    </span>
                    Nueva session
                </button>

            </div>

            <div className="flex justify-around  items-center ">
                {session.flashcards.list.length > 0 &&
                    <Card />
                }
            </div>

            <div>

                <label class="inline-flex items-center cursor-pointer">
                    <input onChange={(e) => (setTestMode(e.currentTarget.checked))} type="checkbox" value="" class="sr-only peer" />
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">test mode</span>
                </label>



                {testMode &&

                    session.flashcards.list.length > 0 && session.flashcards.list.map((item) => (

                        <ItemListFlashcard />
                    ))
                }

            </div>


        </div>



    );
}




