import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Paginator } from "@portal/types";

const PAGE_SIZE = 20;

export const usePaginator = (updateParameters = true): Paginator => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [previous, setPrevious] = useState<string[]>();
  const [after, setAfter] = useState<string>();
  const [first] = useState<number>(PAGE_SIZE);

  useEffect(() => {
    setAfter(searchParams.get("after"));
  }, [searchParams]);

  const handleNextPage = (value: string) => {
    if (updateParameters) {
      setSearchParams({ after: value });
    } else {
      setPrevious([...previous, after]);
      setAfter(value);
    }
  };

  const handlePreviousPage = () => {
    if (updateParameters) {
      history.back();
    } else {
      setAfter(previous.pop());
      setPrevious([...previous.slice(0, -1)]);
    }
  };

  return {
    handleNextPage,
    handlePreviousPage,
    after,
    first,
  };
};

export default usePaginator;
