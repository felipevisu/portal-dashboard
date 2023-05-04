import { uniqBy } from "lodash";

import { MultiAutocompleteChoiceType } from "@portal/components/Attributes/utils";
import { FormChange } from "@portal/hooks/useForm";
import { ChangeEvent } from "@portal/types";

import { toggle } from "../lists";

export const combinedMultiAutocompleteChoices = (
  selected: MultiAutocompleteChoiceType[],
  choices: MultiAutocompleteChoiceType[]
) => uniqBy([...selected, ...choices], "value");

function createMultiAutocompleteSelectHandler(
  change: FormChange,
  setSelected: (choices: MultiAutocompleteChoiceType[]) => void,
  selected: MultiAutocompleteChoiceType[],
  choices: MultiAutocompleteChoiceType[]
): FormChange {
  return (event: ChangeEvent) => {
    change(event);

    const combinedChoices = combinedMultiAutocompleteChoices(selected, choices);

    const id = event.target.value;
    const choice = combinedChoices.find((choice) => choice.value === id);

    if (!choice) {
      return;
    }

    setSelected(toggle(choice, selected, (a, b) => a.value === b.value));
  };
}

export default createMultiAutocompleteSelectHandler;
