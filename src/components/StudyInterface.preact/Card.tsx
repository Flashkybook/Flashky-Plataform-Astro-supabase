

import type { SPB_FlashCard } from "@env";
import { useStore } from '@nanostores/preact'
import type { JSXInternal } from "node_modules/preact/src/jsx";
import { useEffect, useState } from "preact/hooks";
import { $session, newSession } from "@lib/db/nanostores/study.store";

// https://github.com/Flashkybook/old-app-frontend-next.js/blob/main/src/components/Games/InputGame.jsx
const Card = () => {
    const session = useStore($session)
    const current_card: SPB_FlashCard = session.flashcards.list[session.current.index]




    const audioURL = window.location.origin + `/tts?expression=` +
        encodeURIComponent(current_card?.expression_name)
    const audio_data = new Audio(audioURL)

    const playSound = () => {
        const input = document.querySelector("input[aria-label='answer']") as HTMLInputElement
        input.focus()
        audio_data.currentTime = 0
        setTimeout(() => {
            audio_data.play()
        }, 250);
    }



    const nextCurrent = () => {

        // remove from flashcards.list and add to flashcards.finished
        if (session.current.correct == true) {
            session.flashcards.finished.push(session.flashcards.list[session.current.index])
            session.flashcards.list.splice(session.current.index, 1)

            $session.set({
                flashcards: {
                    list: session.flashcards.list,
                    finished: session.flashcards.finished
                },
                current: {
                    index: session.current.index,
                    correct: true
                }
            })
            session.flashcards = $session.get().flashcards

            if (session.flashcards.list.length < 1) {
                window.location.href = "/app/study/results";
            }

        } else {
            if(session.flashcards.list[session.current.index].repeats < 5){session.flashcards.list[session.current.index].repeats += 1
            }

            if (session.current.index >= session.flashcards.list.length - 1) {                
                console.log("vuelve a iniciar")
                $session.setKey("current", {
                    index: 0,
                    correct: true
                },)
            } else {
                console.log("next")
                $session.setKey("current", {
                    index: session.current.index + 1,
                    correct: true
                },)
            }
        }

    }


    const handleSubmit = (e: JSXInternal.TargetedSubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const answer = e.currentTarget.getElementsByTagName("input")[0].value

        // analyze answer correct or incorrect
        if (answer == current_card.expression_name) {
            nextCurrent()
        } else {
            "first time incorrect in this round"
            session.current.correct = false
        }

        // e.currentTarget.reset()

    }



    return (

        <div class={"text-center flex flex-col justify-center p-8 bg-slate-700 rounded-3xl gap-y-6"}>

            <button onClick={() => playSound()}>
                <span class="material-symbols-outlined">
                    volume_up
                </span>
            </button>

            {current_card.expression_name}
            {!session.current.correct &&
                <span class="text-red-500">
                    {current_card.expression_name}
                </span>
            }

            <form onSubmit={e => handleSubmit(e)}>
                <input aria-label={"answer"} type="text" placeholder={"answer"} class={"w-full outline-none rounded-sm border-green-500 bg-slate-900 px-4"} name={"answer"} />
            </form>

        </div>
    )
}

export default Card