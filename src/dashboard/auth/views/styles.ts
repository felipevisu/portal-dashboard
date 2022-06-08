import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  header: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
  panel: {
    "& span": {
      color: theme.palette.error.contrastText,
    },
    ...theme.typography.body1,
    background: theme.palette.alert.paper.error,
    borderRadius: 8,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1.5, 2.5),
  },
  loginButton: {
    width: "100%",
  },
}));

export default useStyles;
