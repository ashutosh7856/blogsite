import type { ChangeEvent } from "react";

type InputType = 'password' | 'text' | 'email';

interface InputProps {
    type?: InputType,
    placeholder: string,
    name?: string,
    value?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    className?: string
}

export default function Input({ type = 'text', placeholder, name, value, onChange, className = '' }: InputProps) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`h-14 w-[448px] bg-[#F0F2F5] p-4 rounded-[8px] ${className}`}
        />
    )
}