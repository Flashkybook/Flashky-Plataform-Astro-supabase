import BtnIcon from "@shared/ui/BtnIcon.astro";
import { $user } from "../model/store";

export default function Logout() {
    const logout = () => {
        fetch("/api/v0/auth/logout").then(()=>{

            $user.set(undefined);
            localStorage.clear();
            window.location.href = "/";
        })
    }
    return (

        <button onClick={() => logout()}
            className={
                "btn-outline min-w-10 min-h-10 gap-x-2  px-[15%]border border-gray-500 dark:border-gray-400 dark:text-primary-200 text-primary-600rounded-[6.25rem] relative !inline-flex items-center justify-center tracking-[.00714em] "}
        >

            <h2 class="hidden sm:flex">logout</h2>

            <span class="material-symbols-outlined"> logout </span>
        </button>


        // <a href="/api/v0/auth/logout" onClick={() => logout()}>
        //     {console.log("INLINE?")}
        //    
        // </a>
    )
}