import { styled } from "@mui/material";

export const RichtextRoot = styled("div")(({ theme }) => ({
  border: "1px solid",
  borderColor: theme.palette.grey[400],
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));
