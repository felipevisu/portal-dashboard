import isEqual from "lodash/isEqual";

import { ChangeEvent } from "@portal/types";
import { toggle } from "@portal/utils/lists";

import useStateFromProps from "./useStateFromProps";

export type SubmitPromise<TData = any> = Promise<TData>;

export interface CommonUseFormResult<TData> {
  data: TData;
  change: FormChange;
  submit: (dataOrEvent?: any) => SubmitPromise<any[]>;
}

export interface CommonUseFormResultWithHandlers<TData, THandlers>
  extends CommonUseFormResult<TData> {
  handlers: THandlers;
}

export type FormChange<T = any> = (
  event: ChangeEvent<T>,
  cb?: () => void
) => void;

export type FormErrors<T> = {
  [field in keyof T]?: string | React.ReactNode;
};

type FormData = Record<string, any | any[]>;

function merge<T extends FormData>(prevData: T, prevState: T, data: T): T {
  return Object.keys(prevState).reduce(
    (acc, key) => {
      if (!isEqual(data[key], prevData[key])) {
        acc[key as keyof T] = data[key];
      }

      return acc;
    },
    { ...prevState }
  );
}

export const useForm = <T extends FormData, TErrors>(
  initialData: T,
  onSubmit?: (data: T) => SubmitPromise<TErrors[]> | void
) => {
  const [data, setData] = useStateFromProps(initialData, {
    mergeFunc: merge,
  });

  function change(event: ChangeEvent) {
    const { name, value } = event.target;

    if (!(name in data)) {
      console.error(`Unknown form field: ${name}`);
    } else {
      setData((data) => ({
        ...data,
        [name]: value,
      }));
    }
  }

  function set(newData: Partial<T>) {
    setData((data) => ({
      ...data,
      ...newData,
    }));
  }

  async function submit() {
    onSubmit(data);
  }

  function toggleValue(event: ChangeEvent, cb?: () => void) {
    const { name, value } = event.target;
    const field = data[name as keyof T];

    if (Array.isArray(field)) {
      setData({
        ...data,
        [name]: toggle(value, field, isEqual),
      });
    }

    if (typeof cb === "function") {
      cb();
    }
  }

  return {
    data,
    submit,
    change,
    toggleValue,
    set,
  };
};

export default useForm;
