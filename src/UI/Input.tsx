import React from "react";

interface InputProps {
  type: string;
  name: string;
  label?: string;
  error: any | undefined;
  extraInputClasses?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  return (
    <div>
      {props.label && <label className="mb-1 block">{props.label}</label>}
      <input
        className={`border w-full rounded py-2 px-4 ${
          props.extraInputClasses ? props.extraInputClasses : ""
        }`}
        type={props.type}
        name={props.name}
        onChange={(e) => props.handleChange(e)}
      />
      {props.error && <div>{props.error.message}</div>}
    </div>
  );
};

export default Input;
