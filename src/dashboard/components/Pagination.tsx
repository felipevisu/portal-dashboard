import { PageInfoFragment } from "@portal/graphql";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

interface PaginationProps {
  pageInfo: PageInfoFragment;
  onClickNextPage: (value: string) => void;
  onClickPreviousPage: () => void;
}

const buttonClass = {
  default:
    "border border-2 border-blue-500 text-blue-500 text-2xl p-1 hover:bg-blue-500 hover:text-white",
  disabled:
    "border border-2 border-blue-500 text-blue-500 text-2xl p-1 opacity-50",
};

export const Pagination = ({
  pageInfo,
  onClickNextPage,
  onClickPreviousPage,
}: PaginationProps) => {
  const [searchParams] = useSearchParams();

  const previousDisabled = !searchParams.get("after");
  const nextDisabled = !pageInfo.hasNextPage;

  return (
    <div className="flex space-x-2 mt-4 justify-end">
      <button
        disabled={previousDisabled}
        onClick={onClickPreviousPage}
        className={buttonClass[previousDisabled ? "disabled" : "default"]}
      >
        <FiChevronLeft />
      </button>
      <button
        disabled={nextDisabled}
        onClick={() => onClickNextPage(pageInfo.endCursor)}
        className={buttonClass[nextDisabled ? "disabled" : "default"]}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
