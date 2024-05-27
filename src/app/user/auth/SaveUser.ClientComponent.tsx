import type { SPB_UserData } from "../model/schema";
import { $user } from "../model/store";


export default function getUser({ user }: { user: SPB_UserData | undefined }) {
    
    
    if (user && window.location.pathname == "/") {
        $user.set(user)
        window.location.href = "/app"
    }
    else if(user == undefined && window.location.pathname != "/") {
        localStorage.clear()
        $user.set(undefined)
        window.location.href = "/"
    }

    return ""

}