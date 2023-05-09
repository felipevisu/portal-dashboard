import { useEffect, useState } from "react";
import { parse } from "qs";
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

const initialDirection = {
  first: PAGE_SIZE,
  last: null,
};

export const usePaginator = (): Paginator => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [direction, setDirection] = useState<PaginationState>(initialDirection);

  useEffect(() => {
    if (searchParams.get("after")) {
      setDirection({
        first: PAGE_SIZE,
        last: null,
      });
    }
    if (searchParams.get("before")) {
      setDirection({
        first: null,
        last: PAGE_SIZE,
      });
    }
  }, [searchParams]);

  const handleNextPage = (value: string) => {
    const params = parse(searchParams.toString());
    delete params.before;
    setSearchParams({ ...params, after: value });
  };

  const handlePreviousPage = (value: string) => {
    const params = parse(searchParams.toString());
    delete params.after;
    setSearchParams({ ...params, before: value });
  };

  return {
    handleNextPage,
    handlePreviousPage,
    pagination: {
      ...direction,
      after: searchParams.get("after") || "",
      before: searchParams.get("before") || "",
    },
  };
};

export default usePaginator;
