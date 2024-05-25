import BtnIcon from "@shared/ui/BtnIcon.astro";
import type { SPB_FlashCard } from "../models/schema";
import type { JSXInternal } from "node_modules/preact/src/jsx";

export default function BtnDelete({ flashcard }: { flashcard: SPB_FlashCard }) {

    const onSubmit = async (e: JSXInternal.TargetedSubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const accept = confirm(
            "¿Deseas borrar esta tarjeta?"
        );

        if (accept) {
            fetch(`/api/v0/flashcard/delete?card_id=${flashcard.id}&expression_id=${flashcard.expression_name}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            ).then((res) => {
                if (res.status == 200) {
                    window.location.reload();
                }
            });
        }
    }


    return <form class="delete" onSubmit={onSubmit}>
        <button type={"submit"} className={
            "btn-outline min-w-10 min-h-10 gap-x-2  px-[15%]    border border-gray-500 dark:border-gray-400 dark:text-primary-200 text-primary-600  rounded-[6.25rem] relative !inline-flex items-center justify-center tracking-[.00714em] "} >

                <span class="material-symbols-outlined"> delete </span>
        </button>

    </form>
}