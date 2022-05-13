import { ErrorFragment } from "@portal/graphql";
import React from "react";

interface InputProps {
  type: string;
  name: string;
  label?: string;
  value?: string | number;
  error?: ErrorFragment | undefined;
  extraInputClasses?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  return (
    <div className="mt-3">
      {props.label && <label className="mb-1 block">{props.label}</label>}
      <input
        className={`shadow-sm focus:outline-none border w-full rounded py-2 px-4 focus:border-blue-300 ${
          props.extraInputClasses ? props.extraInputClasses : ""
        }`}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(e)}
      />
      {props.error && (
        <span className="text-sm text-red-600">{props.error.message}</span>
      )}
    </div>
  );
};

export default Input;
