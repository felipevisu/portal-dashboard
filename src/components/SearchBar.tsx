import React from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  (theme: any) => ({
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      display: "flex",
      flexWrap: "wrap",
      padding: theme.spacing(2, 2),
    },
    input: {
      padding: "10.5px 12px",
    },
  }),
  {
    name: "SearchInput",
  }
);

interface SearchBarProps {
  placeholder?: string;
  onSearchChange: (e: React.ChangeEvent<any>) => void;
}

export const SearchBar = ({ placeholder, onSearchChange }: SearchBarProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        fullWidth
        onChange={onSearchChange}
        inputProps={{
          className: classes.input,
          placeholder,
        }}
      />
    </div>
  );
};

export default SearchBar;
