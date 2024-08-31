import React from "react";

import { useSearchParams } from "react-router-dom";

import { useCategoriesQuery } from "@portal/graphql";
import { useFilterHandler, usePaginator } from "@portal/hooks";

import { mapEdgesToItems } from "@portal/utils/maps";

import CategoryListPage from "../components/CategoryListPage";

import { getFilterVariables } from "./filters";
import NotFound from "@portal/components/NotFound";

export const CategoryList = () => {
  const [searchParams] = useSearchParams();

  const { pagination, handleNextPage, handlePreviousPage } = usePaginator();

  const { data, loading, error } = useCategoriesQuery({
    fetchPolicy: "cache-and-network",
    variables: { ...pagination, filter: getFilterVariables(searchParams) },
  });

  const [, , handleSearchChange] = useFilterHandler();

  if (error) return <NotFound />;

  return (
    <CategoryListPage
      disabled={loading}
      categories={mapEdgesToItems(data?.categories)}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
      pageInfo={data?.categories?.pageInfo}
      onSearchChange={handleSearchChange}
      initialSearch={searchParams.get("search") || ""}
    />
  );
};

export default CategoryList;
