import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@saleor/macaw-ui";

const useStyles = makeStyles(
  (theme) => ({
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
  onChangeSearch: (e: React.ChangeEvent<any>) => void;
}

export const SearchBar = ({ placeholder, onChangeSearch }: SearchBarProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        fullWidth
        onChange={onChangeSearch}
        inputProps={{
          className: classes.input,
          placeholder,
        }}
      />
    </div>
  );
};

export default SearchBar;
