import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FilterOpts } from "@portal/types";
import React from "react";

interface FilterItemProps {
  name: string;
  filter: FilterOpts<any>;
  onClick: (name: string, value: string) => void;
  selected?: string;
}

const FilterItem = ({ name, filter, onClick, selected }: FilterItemProps) => {
  return (
    <Accordion disableGutters>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={name}
        id={name}
      >
        <Typography>{filter.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <RadioGroup>
          {filter.choices.map((choice) => (
            <FormControlLabel
              key={choice.value}
              value={choice.value}
              checked={selected === choice.value}
              name={name}
              control={<Radio />}
              label={choice.label}
              onClick={() => onClick(name, choice.value)}
            />
          ))}
        </RadioGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterItem;
