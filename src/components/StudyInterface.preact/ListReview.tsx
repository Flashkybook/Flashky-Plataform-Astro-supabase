import { $session } from "@lib/db/nanostores/study.store";
import { useEffect, useState } from "preact/hooks";


export default function ListReview() {

    const [update, setUpdate] = useState(false);

    console.log($session.get().flashcards.finished)



    return (

        <div class="my-16 p-6 rounded-xl bg-neutral-10 dark:bg-neutral-900 border border-gray-200 dark:border-gray-700 ">
            <div>
                <h3 class="text-2xl font-semibold text-gray-700 dark:text-white">Resultados</h3>

                <ul class="flex flex-col">
                    {$session.get().flashcards.finished.map((v, i) => (
                        <li class="relative">
                            <div class="hover:bg-gray-100 dark:hover:bg-gray-800 flex flex-row items-center gap-4 py-2 pl-4 pr-6">
                                <div class="w-14 h-14 flex items-center justify-center title-md font-bold bg-primary-600 text-white dark:bg-primary-200 dark:text-neutral-900">
                                    <img src="/favicon.svg" alt="media 2" class="w-8 h-8" />
                                </div>
                                <div class="flex flex-col flex-grow">
                                    <p class="tracking-[.03125em] underline">{v.expression_name}</p>
                                    <span class="text-sm tracking-[0.25px]">next review: {v.next_review}</span>
                                </div>
                    
                                <span class="text-[11px] leading-4 tracking-[.045em] font-medium">{v.repeats}</span>

                                <span class="text-[11px] leading-4 tracking-[.045em] font-medium">{v.score}</span>
                            </div>
                        </li>
                    ))}


                </ul>

            </div>


        </div>

    )
}