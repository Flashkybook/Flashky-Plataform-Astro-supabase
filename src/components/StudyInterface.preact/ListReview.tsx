import { useEffect, useState } from "preact/hooks";
import { $session } from "@lib/db/session.store";
import { useStore } from '@nanostores/preact'
import type { SPB_FlashCard } from "@env";


export default function ListReview() {

    const session = useStore($session)

    useEffect(() => {
        if (!session.flashcards.updated) {
            fetch("/api/v0/study/results_update", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({
                    session: session.flashcards.finished
                })
            })
                .then((res) => res.json())
                .then((res: SPB_FlashCard[]) => {
                    $session.setKey("flashcards", { ...session.flashcards, updated: res })
                    session.flashcards = $session.get().flashcards
                }
                )
        }
    }, [])

    if (!session.flashcards.updated) {
        return false

    }



    return (<div class="my-16 p-6 rounded-xl bg-neutral-10 dark:bg-neutral-900 border border-gray-200 dark:border-gray-700 ">
        <div>
            <h3 class="text-2xl font-semibold text-gray-700 dark:text-white">Resultados</h3>

            <ul class="flex flex-col">
                {session.flashcards.updated.map((v, i) => (


                    <li class="relative">

                        <div class="hover:bg-gray-100 dark:hover:bg-gray-800 flex flex-row items-center gap-4 py-2 pl-4 pr-6">
                            <div class="w-14 h-14 flex items-center justify-center title-md font-bold bg-primary-600 text-white dark:bg-primary-200 dark:text-neutral-900">
                                <img src="/favicon.svg" alt="media 2" class="w-8 h-8" />
                            </div>
                            <div class="flex flex-col flex-grow">
                                <p class="tracking-[.03125em] underline">{v.expression_name}</p>

                                {/* TODO Humanize date next review */}
                                <span class="text-sm tracking-[0.25px]">
                                    next review: {v.next_review}
                                </span>

                            </div>

                            {/* TODO animate from previous percentage  */}
                            <span className='text-[0.75rem] text-blue-100 text-center min-w-[5rem]'>
                                <div className='w-full md:w-full bg-gray-900 rounded-full border-2 border-black '>
                                    <div
                                        className='bg-slate-600 leading-none rounded-full'
                                        style={{ width: `${v.efactor * 100 / 5}%` }}
                                    > {v.efactor * 100 / 5}%
                                    </div>
                                </div>
                            </span>

                            <div class={"flex flex-col"}>

                                {v.fails > 0 ?
                                    <span class="text-[11px] leading-4 tracking-[.045em] font-medium">fails: {v.fails} </span> :
                                    <span class="text-[11px] leading-4 tracking-[.045em] font-medium">racha:
                                        {v.repetition} días</span>
                                }

                            </div>

                        </div>
                    </li>
                ))}


            </ul>

        </div>


    </div>)




}