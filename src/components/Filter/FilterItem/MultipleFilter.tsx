import React, { useEffect } from "react";

import { FormGroup } from "@mui/material";
import ControlledCheckbox from "@portal/components/ControlledCheckbox";
import useListActions from "@portal/hooks/useListActions";
import { FilterOpts } from "@portal/types";

interface MultipleFilterProps {
  filter: FilterOpts;
  value: string[];
  onChange: ({ name, value }) => void;
}

export const MultipleFilter = ({
  filter,
  value = [],
  onChange,
}: MultipleFilterProps) => {
  const { toggle, listElements } = useListActions(value);

  useEffect(() => {
    onChange({ name: filter.slug, value: listElements });
  }, [listElements]);

  return (
    <FormGroup>
      {filter.choices.map((choice) => (
        <ControlledCheckbox
          key={choice.value}
          label={choice.label}
          name={filter.name}
          checked={value.some((val) => val === choice.value)}
          onChange={() => toggle(choice.value)}
        />
      ))}
    </FormGroup>
  );
};

export default MultipleFilter;
