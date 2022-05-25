import { ErrorFragment } from "@portal/graphql";
import { FiAlertCircle } from "react-icons/fi";
import React from "react";

type Option = {
  id: string;
  name: string;
};

interface SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string | number;
  error?: ErrorFragment | undefined;
  extraInputClasses?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

export const Select = (props: SelectProps) => {
  return (
    <div className="">
      {props.label && <label className="mb-1 block">{props.label}</label>}
      <select
        className={`
          form-select 
          appearance-none
          bg-white bg-clip-padding bg-no-repeat
          shadow-sm 
          focus:outline-none 
          border 
          w-full 
          rounded 
          h-11 
          px-4 
          focus:border-blue-300 
          ${props.extraInputClasses ? props.extraInputClasses : ""}`}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(e)}
      >
        <option>Selecione uma das opções</option>
        {props.options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {props.error && (
        <span className="text-sm text-red-600 flex items-center space-x-1 mt-1">
          <FiAlertCircle />
          <span>{props.error.message}</span>
        </span>
      )}
    </div>
  );
};

export default Select;
