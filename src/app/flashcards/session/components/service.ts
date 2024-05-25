import type { SPB_FlashCard } from "@app/flashcards/models/schema"


export const newSession = async (user_id: string | undefined) => {
    const res = await fetch("/api/v1/session/new", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            user_id
        })
    })
    if (res.status != 200) {
        console.error(res)
    }

    const data: { data: SPB_FlashCard[] } = await res.json()
    return data
}