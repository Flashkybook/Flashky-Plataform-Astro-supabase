

import type { SPB_FlashCard } from "@env";
import { useStore } from '@nanostores/preact'
import { $session, newSession } from "@lib/db/nanostores/study.store";
import type { JSXInternal } from "node_modules/preact/src/jsx";
import { useEffect, useState } from "preact/hooks";


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

    if ($session.get().flashcards.list.length < 1) {
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
    const session = useStore($session)
    const current_card: SPB_FlashCard = session.flashcards.list[session.current.index]

    const messages = {
        correct: "Correcto!",
        incorrect: "Incorrecto"
    }
    const [errorMessage, setErrorMessage] = useState<String | null>(null)


    const audioURL = window.location.origin + `/tts?expression=` +
        encodeURIComponent(current_card.expression_name)
    const audio_data = new Audio(audioURL)

    const playSound = () => {
        const input = document.querySelector("input[aria-label='answer']") as HTMLInputElement
        input.focus()
        audio_data.currentTime = 0
        setTimeout(() => {
            audio_data.play()
        }, 250);
    }

    useEffect(() => {
        setTimeout(() => {
            playSound()
        }, 500)
    })

    const nextCurrent = () => {

        // remove from flashcards.list and add to flashcards.finished
        if (session.current.incorrect == false) {
            session.flashcards.finished.push(session.flashcards.list[session.current.index])
            session.flashcards.list.splice(session.current.index, 1)
            $session.set({
                flashcards: {
                    list: session.flashcards.list,
                    finished: session.flashcards.finished
                },
                current: {
                    index: session.current.index,
                    incorrect: false
                }
            })
            session.flashcards = $session.get().flashcards
            console.log(session.flashcards)
            if (session.flashcards.list.length < 1) {
                window.location.href = "/app/study/results";
            }

        } else {
            if (session.current.index == session.flashcards.list.length - 1) {
                $session.setKey("current", {
                    index: 0,
                    incorrect: false
                },)
            } else {
                $session.setKey("current", {
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
            console.log("correcto")
            console.log($session.get().flashcards.list[session.current.index])

            nextCurrent()
            setErrorMessage(null)

        } else if (session.current.incorrect == false) {
            console.log("es incorrecto por primera ves")
            session.current.incorrect = true            
            console.log($session.get().flashcards.list[session.current.index])

        }

        e.currentTarget.reset()

    }
    console.log($session.get().flashcards)



    return (

        <div class={"text-center flex flex-col justify-center p-8 bg-slate-700 rounded-3xl gap-y-6"}>

            <button onClick={() => playSound()}>
                <span class="material-symbols-outlined">
                    volume_up
                </span>
            </button>

            {/* {current_card.expression_name} */}
            {session.current.incorrect && "Expression correcta es "  + current_card.expression_name}

            <form onSubmit={e => handleSubmit(e)}>
                <input aria-label={"answer"} type="text" placeholder={"answer"} class={"w-full outline-none rounded-sm border-green-500 bg-slate-900 px-4"} name={"answer"} />
            </form>

        </div>
    )
}