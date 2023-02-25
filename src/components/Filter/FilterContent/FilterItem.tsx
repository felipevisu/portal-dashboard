import React from "react";

import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormSpacer from "@portal/components/FormSpacer";
import { FilterOpts } from "@portal/types";

interface FilterItemProps {
  filter: FilterOpts;
  onClick: ({ name, value }) => void;
  value: any;
}

const FilterItem = ({ filter, onClick, value }: FilterItemProps) => {
  return (
    <Accordion disableGutters>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={filter.name}
        id={filter.name}
      >
        <Typography>{filter.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {filter.type === "radio" && (
          <RadioGroup>
            {filter.choices.map((choice) => (
              <FormControlLabel
                key={choice.value}
                value={choice.value}
                checked={value === choice.value}
                name={filter.name}
                control={<Radio />}
                label={choice.label}
                onClick={() =>
                  onClick({ name: filter.slug, value: choice.value })
                }
              />
            ))}
          </RadioGroup>
        )}
        {filter.type === "daterange" && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormSpacer />
            <FormControl fullWidth>
              <DatePicker
                inputFormat="dd/MM/yyyy"
                value={value?.Gte || ""}
                label="De"
                onChange={(val: Date) => {
                  onClick({
                    name: filter.slug,
                    value: {
                      ...value,
                      Gte: val,
                    },
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} error={false} />
                )}
              />
            </FormControl>
            <FormSpacer />
            <FormControl fullWidth>
              <DatePicker
                inputFormat="dd/MM/yyyy"
                value={value?.Lte || ""}
                label="Até"
                onChange={(val: Date) => {
                  onClick({
                    name: filter.slug,
                    value: { ...value, Lte: val },
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} error={false} />
                )}
              />
            </FormControl>
          </LocalizationProvider>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterItem;
