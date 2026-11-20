import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{

}

export function Input(props:InputProps){
    return (
        <input type="text"
        className="input-hostinger h-9 rounded-md outline-none px-2 mb-3"
        {...props}
        />
    )
}