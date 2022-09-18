import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Paginator } from "@portal/types";

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

export interface PaginationState {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
}

const PAGE_SIZE = 20;

export const usePaginator = (): Paginator => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState<PaginationState>({
    before: "",
    after: "",
    first: PAGE_SIZE,
    last: null,
  });

  useEffect(() => {
    if (searchParams.get("after")) {
      setPagination({
        before: "",
        after: searchParams.get("after"),
        first: PAGE_SIZE,
        last: null,
      });
    }
    if (searchParams.get("before")) {
      setPagination({
        before: searchParams.get("before"),
        after: "",
        first: null,
        last: PAGE_SIZE,
      });
    }
  }, [searchParams]);

  const handleNextPage = (value: string) => {
    setSearchParams({ after: value });
  };

  const handlePreviousPage = (value: string) => {
    setSearchParams({ before: value });
  };

  return {
    handleNextPage,
    handlePreviousPage,
    pagination,
  };
};

export default usePaginator;
