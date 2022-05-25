import { ErrorFragment } from "@portal/graphql";
import { FiAlertCircle } from "react-icons/fi";
import React from "react";

interface CheckboxProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: boolean;
  error?: ErrorFragment | undefined;
  extraInputClasses?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = (props: CheckboxProps) => {
  return (
    <div className="">
      <input
        id={props.name}
        className={`
        form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer
          ${props.extraInputClasses}`}
        placeholder={props.placeholder}
        type={"checkbox"}
        name={props.name}
        checked={props.value}
        onChange={(e) => props.onChange(e)}
      />
      <label
        className="form-check-label inline-block text-gray-800"
        htmlFor={props.name}
      >
        {props.label}
      </label>
      {props.error && (
        <span className="text-sm text-red-600 flex items-center space-x-1 mt-1">
          <FiAlertCircle />
          <span>{props.error.message}</span>
        </span>
      )}
    </div>
  );
};

export default Checkbox;
