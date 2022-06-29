import { PageInfoFragment } from "@portal/graphql";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { PaginationToolbar } from "./PaginationToolbar";

interface PaginationProps {
  pageInfo: PageInfoFragment;
  onClickNextPage: (value: string) => void;
  onClickPreviousPage: () => void;
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
  const [searchParams] = useSearchParams();
  const previousDisabled = !searchParams.get("after");
  const nextDisabled = !pageInfo.hasNextPage;

  return (
    <Root>
      <PaginationToolbar
        hasNextPage={!nextDisabled}
        hasPreviousPage={!previousDisabled}
        onNextPage={() => onClickNextPage(pageInfo.endCursor)}
        onPreviousPage={() => onClickPreviousPage()}
      />
    </Root>
  );
};

export default Pagination;
