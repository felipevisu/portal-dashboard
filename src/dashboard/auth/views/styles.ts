import { styled } from "@mui/material";

export const Panel = styled("div")(({ theme }) => ({
  "& span": {
    color: theme.palette.error.contrastText,
  },
  ...theme.typography.body1,
  background: theme.palette.error[theme.palette.mode],
  borderRadius: 4,
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5, 2.5),
}));
