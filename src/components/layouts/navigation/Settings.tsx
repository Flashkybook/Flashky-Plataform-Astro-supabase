import type { SPB_UserData } from "@env";
import { $user } from "@lib/user/user.store";
import matchProtectedUrls from "@lib/utils/isProtected";
import type { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";


interface UserProps { children?: ComponentChildren }
export default function Settings({ children }: UserProps) {

    const protectedUrls: string[] = ["/app/*"];
    const noProtectedUrls: string[] = ["/"];

    // if ($user.get() === undefined && !matchProtectedUrls(noProtectedUrls, window.location.pathname)) {
    //     console.log("no user")
    //     fetch("/api/v0/auth/verify", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     }).then((res) => {
    //         if (res.status != 200) {
    //             $user.set(undefined);
    //             if (matchProtectedUrls(protectedUrls, window.location.pathname)) {
    //                 return window.location.href = "/";
    //             }
    //         } else {
    //             return res.json()
    //         }
    //     }).then((data) => {
    //         $user.set(data);
    //     })
    // }


    // theme
    useEffect(() => {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        // Whenever the user explicitly chooses light mode
        // localStorage.theme = "light";
        // Whenever the user explicitly chooses dark mod
        // localStorage.theme = "dark";

        // Whenever the user explicitly chooses to respect the OS preference
        localStorage.removeItem("theme");

        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    })

    return (
        <div class="flex flex-col justify-center items-center">
            {$user.get() &&
                children
            }
        </div>
    )

}