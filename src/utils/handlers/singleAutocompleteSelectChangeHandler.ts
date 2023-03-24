import { FormChange } from "@portal/hooks/useForm";

export type ChoiceValue = string;
export interface SingleAutocompleteChoiceType<
  V extends ChoiceValue = ChoiceValue,
  L = string
> {
  label: L;
  value: V;
}

export interface SingleAutocompleteSelectedChangeHandlerProps {
  change: FormChange;
  setSelected: (value: string) => void;
  choices: SingleAutocompleteChoiceType[];
}

function createSingleAutocompleteSelectHandler(
  change: FormChange,
  setSelected: (value: string) => void,
  choices: SingleAutocompleteChoiceType[]
): FormChange {
  return (event: React.ChangeEvent<any>) => {
    change(event);

    const value = event.target.value;
    const choice = choices.find((category) => category.value === value);
    setSelected(choice ? choice.label : value);
  };
}

export default createSingleAutocompleteSelectHandler;
