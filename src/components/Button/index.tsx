import React from "react";

export type ButtonProps = {
  disabled?:boolean;
  type: "button" | "submit" | "reset" | undefined;
  children?:any;
};

export const Button:React.FC<ButtonProps> = ({
    disabled,
    type,
    children
}) => {
    return (
        <button
            disabled={ disabled }
            type={ type }
            className= { `group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4E47C2] hover:bg-[#7A75D1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
                { children }
        </button>
    )
}