

import type { SPB_FlashCard } from "@app/flashcards/models/schema";
import { $session } from "../model/store";
import { useStore } from '@nanostores/preact'
import type { JSXInternal } from "node_modules/preact/src/jsx";
import { useEffect, useRef, useState } from "preact/hooks";
import text_formatter from "@shared/utils/text_formatter";

// https://github.com/Flashkybook/old-app-frontend-next.js/blob/main/src/components/Games/InputGame.jsx
export default function FlashCard() {
    const session = useStore($session)
    const [loadAudio, setLoadAudio] = useState(false)


    const current_card: SPB_FlashCard = session.flashcards.list[session.current.index]

    const audioURL = "https://tts-api-96an.onrender.com/tts/?expression=" +
        encodeURIComponent(current_card?.expression_name)
    const audio_data = new Audio(audioURL)

    const inputRef = useRef<HTMLInputElement>(null)
    const paragraphRef = useRef<HTMLParagraphElement>(null)

    const playSound = () => {
        inputRef.current?.focus()

        audio_data.currentTime = 0
        setLoadAudio(true)
        setTimeout(() => {
            audio_data.play()
            setLoadAudio(false)

        }, 500);
    }
    useEffect(() => {

        if (session.flashcards.list[session.current.index] == undefined) {
            $session.setKey("current", { ...session.current, index: 0 })
            session.current.index = 0
        }
        if (current_card?.expression_name != undefined) {
            playSound()
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
                window.location.href = "/app/session/results";
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
            if (paragraphRef.current) { paragraphRef.current.innerHTML = "" }
            nextCurrent()
        } else {
            if (paragraphRef.current !== null) {
                paragraphRef.current.innerHTML = current_card.expression_name.split(" ").map(e => `<span class="text-gray-600">${e}</span>`).join(" ")

                answer.split(" ").forEach((word, index) => {
                    const currentWordExpression = paragraphRef.current?.children[index]
                    if (currentWordExpression?.innerHTML == word) {
                        currentWordExpression.classList.add("text-green-500")
                    } else {
                        currentWordExpression?.classList.add("text-red-500")
                    }
                })


            }
            session.current.correct = false
            playSound()
        }
        e.currentTarget.reset()

    }

    return (

        <div class={"w-full md:w-2/3 text-center flex flex-col justify-center shadow-md shadow-black bg-surface-100 dark:bg-surfacedark-100 p-[4%] "}>
            <div class={"relative"}>


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
            <div className="text-xl sm:text-3xl">

                <form onSubmit={e => handleSubmit(e)}>
                    <label class={"text-left relative"}>

                        {/* <p  class={"absolute "}></p> */}

                        <span ref={paragraphRef} ></span>
                        <input
                            ref={inputRef}
                            onChange={() => console.log("hola mundo")}
                            style={{ caretColor: "white" }}
                            aria-label={"answer"}
                            type="text"
                            placeholder={""}
                            name={"answer"}
                            autofocus={true}
                            autocomplete={"off"}
                            class={"p-2 px-4  text-ellipsis w-full  border-b border-blue-50 outline-none bg-transparent mt-4  "}
                        />
                    </label>

                </form>


            </div>

        </div>
    )
}

