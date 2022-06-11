import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 1;

export const usePaginator = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [after, setAfter] = useState<string>();
  const [first] = useState<number>(PAGE_SIZE);

  useEffect(() => {
    setAfter(searchParams.get("after"));
  }, [searchParams]);

  const handleNextPage = (value: string) => {
    setSearchParams({ after: value });
  };

  const handlePreviousPage = () => {
    history.back();
  };

  return {
    handleNextPage,
    handlePreviousPage,
    after,
    first,
  };
};

export default usePaginator;
