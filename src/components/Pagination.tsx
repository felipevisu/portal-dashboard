import { PageInfoFragment } from "@portal/graphql";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";

interface PaginationProps {
  pageInfo: PageInfoFragment;
  onClickNextPage: (value: string) => void;
  onClickPreviousPage: () => void;
}

const useStyles = makeStyles((theme: any) => ({
  pagination: {
    padding: theme.spacing(1, 2),
  },
}));

export const Pagination = ({
  pageInfo,
  onClickNextPage,
  onClickPreviousPage,
}: PaginationProps) => {
  const [searchParams] = useSearchParams();
  const previousDisabled = !searchParams.get("after");
  const nextDisabled = !pageInfo.hasNextPage;
  const classes = useStyles();

  return <div className={classes.pagination}></div>;
};

export default Pagination;
