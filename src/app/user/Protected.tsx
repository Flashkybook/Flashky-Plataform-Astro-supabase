import { $user } from "@app/user/model/store";
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



    return (
        <div class="flex flex-col justify-center items-center">
            {$user.get() &&
                children
            }
        </div>
    )

}