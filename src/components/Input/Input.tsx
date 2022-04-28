import React, { HTMLInputTypeAttribute } from "react";

export type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute | 'textarea';
  required?: boolean;
  value:string;
  onChange?:React.ChangeEventHandler <HTMLInputElement | HTMLTextAreaElement> | undefined;
  
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder = '',
  type,
  required = false,
  value,
  onChange
}) => {
    const inputClassNames = `
    className="appearance-none rounded-md relative block w-full px-3 py-2 mt-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  `;


  return (
    <>
      <label htmlFor={ name } className="sr-only">
      { label }
      </label>
      {
        type === 'textarea' ?
          (
            <textarea
              id={ name }
              rows={ 2 }
              name={ name }
              placeholder={ placeholder }
              required={ required }
              className={ inputClassNames }
              value={ value }
              onChange={ onChange }
            /> 
          ) :
          (
            <input
              id={ name }
              type={ type }
              name={ name }
              placeholder={ placeholder }
              className={ `${inputClassNames} resize-none` }
              required={ required }
              value={ value }
              onChange={ onChange }
            />
          )
      }
    </>
  );
};