import { styled } from "@mui/material";

export const Wrapper = styled("div")(() => ({
  display: "flex",
}));

export const Lateral = styled("div")(() => ({
  "> div": {
    "&:first-child": {
      position: "sticky",
      top: 0,
    },
  },
}));

export const Main = styled("div")(({ theme }) => ({
  flexGrow: "1",
  "> div": {
    "&:first-child": {
      minHeight: "calc(100vh - 72px)",
      paddingTop: theme.spacing(3),
    },
  },
}));
