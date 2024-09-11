// components/InputForm.tsx
import { ChangeEvent } from "react";

interface InputFormProps {
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: string;
}

export const InputForm = ({ label, value, onChange, placeholder, type = "text" }: InputFormProps) => (
    <div className="w-full mb-4">
        <label className="block text-sm font-medium mb-2">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-2 border border-gray-300 rounded-lg"
        />
    </div>
);