import React from "react";

import { Grid, Typography } from "@mui/material";

interface BasicAttributeRowProps {
  label: string | React.ReactNode;
}

const BasicAttributeRow: React.FC<BasicAttributeRowProps> = ({
  label,
  children,
}) => {
  return (
    <Grid container spacing={2} py={2}>
      <Grid item xs={6}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={6}>
        {children}
      </Grid>
    </Grid>
  );
};

BasicAttributeRow.displayName = "BasicAttributeRow";
export default BasicAttributeRow;
