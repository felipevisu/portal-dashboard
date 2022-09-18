import React from "react";

import { styled } from "@mui/material/styles";
import { PageInfoFragment } from "@portal/graphql";

import { PaginationToolbar } from "./PaginationToolbar";

interface PaginationProps {
  pageInfo: PageInfoFragment;
  onClickNextPage: (value: string) => void;
  onClickPreviousPage: (value: string) => void;
}

const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  display: "flex",
  justifyContent: "end",
}));

export const Pagination = ({
  pageInfo,
  onClickNextPage,
  onClickPreviousPage,
}: PaginationProps) => {
  return (
    <Root>
      <PaginationToolbar
        hasNextPage={pageInfo.hasNextPage}
        hasPreviousPage={pageInfo.hasPreviousPage}
        onNextPage={() => onClickNextPage(pageInfo.endCursor)}
        onPreviousPage={() => onClickPreviousPage(pageInfo.startCursor)}
      />
    </Root>
  );
};

export default Pagination;
