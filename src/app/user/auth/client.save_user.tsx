import type { SPB_UserData } from "../model/schema";
import { $user } from "../model/store";


export default function getUser({ user }: { user: SPB_UserData | undefined }) {

    if (user) {
        $user.set(user)
        window.location.href = "/app"
    }

    return ""

}