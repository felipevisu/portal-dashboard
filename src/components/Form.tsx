import React from "react";

import { useForm } from "@portal/hooks";
import { SubmitPromise } from "@portal/hooks/useForm";

export interface FormProps<TData, TErrors> {
  initial?: TData;
  onSubmit?: (data: TData) => SubmitPromise<TErrors[]> | void;
  children: (props: any) => React.ReactNode;
}

export const Form = <TData, Terrors>({
  initial,
  onSubmit,
  children,
}: FormProps<TData, Terrors>) => {
  const renderProps = useForm(initial, onSubmit);

  const handleSubmit = () => {
    renderProps.submit();
  };

  return <form onSubmit={handleSubmit}>{children(renderProps)}</form>;
};
