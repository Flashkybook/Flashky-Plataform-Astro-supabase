

import type { SPB_FlashCard } from "@/lib/flashcard/flashcard.schema";
import { $session } from "@lib/flashcard/flashcard.store";
import { useStore } from '@nanostores/preact'
import type { JSXInternal } from "node_modules/preact/src/jsx";
import { useEffect, useState } from "preact/hooks";
import text_formatter from "@/utils/text_formatter";

// https://github.com/Flashkybook/old-app-frontend-next.js/blob/main/src/components/Games/InputGame.jsx
function Card() {
    const session = useStore($session)
    const [loadAudio, setLoadAudio] = useState(false)


    const current_card: SPB_FlashCard = session.flashcards.list[session.current.index]

    const audioURL = "https://tts-api-96an.onrender.com/tts/?expression=" +
        encodeURIComponent(current_card?.expression_name)
    const audio_data = new Audio(audioURL)

    const playSound = () => {
        const input = document.querySelector("input[aria-label='answer']") as HTMLInputElement
        input.focus()

        audio_data.currentTime = 0
        setLoadAudio(true)
        setTimeout(() => {
            audio_data.play()
            setLoadAudio(false)

        }, 500);
    }
    useEffect(() => {
        playSound()

        if (session.flashcards.list[session.current.index] == undefined) {
            $session.setKey("current", { ...session.current, index: 0 })
            session.current.index = 0
        }
    }, [session])



    const nextCurrent = () => {

        // remove from flashcards.list and add to flashcards.finished
        if (session.current.correct == true) {
            session.flashcards.finished.push(session.flashcards.list[session.current.index])
            session.flashcards.list.splice(session.current.index, 1)

            $session.set({
                flashcards: {
                    list: session.flashcards.list,
                    finished: session.flashcards.finished,
                    updated: undefined
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
            if (session.flashcards.list[session.current.index].fails < 5) {
                session.flashcards.list[session.current.index].fails += 1
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
        if (text_formatter(answer) == text_formatter(current_card.expression_name)) {
            nextCurrent()
        } else {
            "first time incorrect in this round"
            session.current.correct = false
            playSound()
        }
        e.currentTarget.reset()

    }

    return (

        <div class={"w-full md:w-2/3 text-center flex flex-col justify-center shadow-md shadow-black bg-surface-100 dark:bg-surfacedark-100 p-[10%] "}>
            <div class={"relative"}>
                <div class={"absolute top-1/2 left-1/2 translate-x-3 -translate-y-1/2 scale-50"}>


                </div>

                <button onClick={() => playSound()}>
                    {loadAudio ?
                        <span class="material-symbols-outlined animate-spin text-7xl">
                            sync
                        </span>
                        :
                        <span class="material-symbols-outlined text-7xl">
                            volume_up
                        </span>
                    }
                </button>
            </div>
            <div className="text-3xl">

                {session.current.correct == false &&
                    <span class="text-red-500">
                        {current_card.expression_name}
                    </span>
                }

                <form onSubmit={e => handleSubmit(e)}>

                    <input
                        style={{ caretColor: "white" }}
                        aria-label={"answer"}
                        type="text"
                        placeholder={"answer"}
                        name={"answer"}
                        autofocus={true}
                        autocomplete={"off"}
                        class={"text-center border-b border-blue-50 outline-none bg-transparent py-2 mt-4 w-full"}
                    />
                </form>
            </div>

        </div>
    )
}

export default Card