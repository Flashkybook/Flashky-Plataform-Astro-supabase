import type { JSXInternal } from "node_modules/preact/src/jsx"


export default function Input() {

    const handleChange =(e: JSXInternal.TargetedEvent<HTMLInputElement, Event>)=>{
        console.log(e.currentTarget.value)
    }
    return (
        <input onChange={handleChange} type="text" />
    )
}