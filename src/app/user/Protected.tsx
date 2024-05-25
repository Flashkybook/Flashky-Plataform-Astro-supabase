import { $user } from "@app/user/model/store";
import matchProtectedUrls from "@shared/utils/isProtected";
import type { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";


interface UserProps { children?: ComponentChildren }
export default function Settings({ children }: UserProps) {

    const user = $user.get()

    const protectedUrls: string[] = ["/app/*"];
    const noProtectedUrls: string[] = ["/"];

    if(matchProtectedUrls(protectedUrls, window.location.pathname ) && !user){
        window.location.href = "/"

    }
    if(matchProtectedUrls(noProtectedUrls, window.location.pathname) && user){
        window.location.href = "/app"
    }


    



    return (
        <div class="flex flex-col justify-center items-center">
            {$user.get() &&
                children
            }
        </div>
    )

}