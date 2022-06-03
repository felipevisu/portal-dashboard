import { PageInfoFragment } from "@portal/graphql";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination as BasePagination, makeStyles } from "@saleor/macaw-ui";

interface PaginationProps {
  pageInfo: PageInfoFragment;
  onClickNextPage: (value: string) => void;
  onClickPreviousPage: () => void;
}

const useStyles = makeStyles((theme) => ({
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

  return (
    <div className={classes.pagination}>
      <BasePagination
        hasNextPage={!nextDisabled}
        hasPreviousPage={!previousDisabled}
        onNextPage={() => onClickNextPage(pageInfo.endCursor)}
        onPreviousPage={() => onClickPreviousPage()}
        labels={{ noOfRows: "número de items" }}
      />
    </div>
  );
};

export default Pagination;
