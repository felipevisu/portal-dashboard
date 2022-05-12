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
    <div className="mt-2">
      {props.label && <label className="mb-1 block">{props.label}</label>}
      <input
        className={`border w-full rounded py-2 px-4 ${
          props.extraInputClasses ? props.extraInputClasses : ""
        }`}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(e)}
      />
      {props.error && <div>{props.error.message}</div>}
    </div>
  );
};

export default Input;
