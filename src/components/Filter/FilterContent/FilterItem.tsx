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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormSpacer from "@portal/components/FormSpacer";
import { FilterOpts } from "@portal/types";

interface FilterItemProps {
  filter: FilterOpts;
  onChange: ({ name, value }) => void;
  value: any;
}

const FilterItem = ({ filter, onChange, value }: FilterItemProps) => {
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
                  onChange({ name: filter.slug, value: choice.value })
                }
              />
            ))}
          </RadioGroup>
        )}
        {filter.type === "daterange" && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormSpacer />
            <FormControl fullWidth>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                value={value?.Gte || ""}
                label="De"
                onChange={(val) => {
                  onChange({
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
                inputFormat="DD/MM/YYYY"
                value={value?.Lte || ""}
                label="Até"
                onChange={(val) => {
                  onChange({
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
