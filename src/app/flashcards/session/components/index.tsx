

import { $session, setNewSession } from "../model/store";
// // import Card from "./Card";
import { newSession } from "./service";
import { useEffect } from "preact/hooks";
import { useStore } from '@nanostores/preact'
import { $user } from "@app/user/model/store";
import FlashCard from "./FlashCard";


export default function Study() {

    const session = useStore($session)

    // console.log(session.flashcards.list, $session.get().flashcards.list)

    useEffect(() => {
        if (session.flashcards.list.length == 0) {
            const user_id = $user.get()?.id
            newSession(user_id).then((res) => {
                const newList = res.data
                setNewSession(newList)
            })
        }

    })

    const handleNewSession = () => {
        const user_id = $user.get()?.id
        newSession(user_id).then((res) => {
            const newList = res.data
            setNewSession(newList)
        })

    }

    return (
        <div class="flex sm:flex-col flex-col-reverse h-[80vh] justify-around">

            <div className="flex justify-between flex-col gap-2 sm:flex-row">

                <a href={"/app"} class="btn-tonal relative flex flex-row items-center justify-center gap-x-2 py-1.5 px-4 rounded-[6.25rem] text-sm tracking-[.00714em] font-medium hover:shadow bg-secondary-100 text-primary-900 dark:bg-secondary-700 dark:text-secondary-100">
                    <span class="material-symbols-outlined">
                        arrow_back_ios
                    </span>
                    volver
                </a>

                <button
                    onClick={handleNewSession}
                    class="btn-tonal relative flex flex-row items-center justify-center gap-x-2 py-1.5 px-4 rounded-[6.25rem] text-sm tracking-[.00714em] font-medium hover:shadow bg-secondary-100 text-primary-900 dark:bg-secondary-700 dark:text-secondary-100">
                    <span class="material-symbols-outlined">
                        info
                    </span>
                    Nueva session
                </button>

            </div>

            <div className="flex justify-around  items-center ">
                {session.flashcards.list.length > 0 &&
                    <FlashCard />
                }
            </div>

            {/* <div>
                <label class="inline-flex items-center cursor-pointer">
                    <input onChange={(e) => (setTestMode(e.currentTarget.checked))} type="checkbox" value="" class="sr-only peer" />
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">test mode</span>
                </label>
            </div> */}


        </div>



    );
}




