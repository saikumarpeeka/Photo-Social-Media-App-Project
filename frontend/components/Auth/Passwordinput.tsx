"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

interface Props {
    name:string;
    label?:string;
    placeholder?:string;
    value?:string;
    onChange?:(e:ChangeEvent<HTMLInputElement>)=>void;
    inputClassName?:string;
    labelClassName?:string;
    iconClassName?:string;
}

const Passwordinput = ({name,label,placeholder='Enter Password',value,onChange,inputClassName="",labelClassName="",iconClassName=""}:Props) => {

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  return (
    <>
      {label && (
        <label className={`font-semibold mb-2 block ${labelClassName}`}>
            {label}
        </label>
      )}
      <div className="relative">
        <input type={showPassword ? 'text': "password"} placeholder={placeholder} value={value} name={name} onChange={onChange} className={`px-4 py-3 bg-blue-100 rounded-lg w-full block outline-blue-700 ${inputClassName}}`} />
        <button type="button" onClick={togglePasswordVisibility} className={`absolute outline-none right-3 top-3 p-0 ${iconClassName}`}>
            {showPassword? (
                <Eye className="h-5 w-5 text-blue-900"/>
            ):(
                <EyeOff className="h-5 w-5 text-blue-900"/>
            )}
        </button>
      </div>
    </>
  )
}

export default Passwordinput;