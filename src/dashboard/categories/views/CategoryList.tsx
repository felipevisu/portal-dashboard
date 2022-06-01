import React from "react";
import { useCategoriesQuery } from "@portal/graphql";
import { mapEdgesToItems } from "@portal/utils/maps";
import CategoryListPage from "../components/CategoryListPage";
import { useBulkActions, usePaginator, useSearch } from "@portal/hooks";
import { DeleteIcon, IconButton } from "@saleor/macaw-ui";

export const CategoryList = () => {
  const { search, handleSearch } = useSearch();
  const { after, first, handleNextPage, handlePreviousPage } = usePaginator();

  const { isSelected, listElements, toggle, toggleAll } = useBulkActions([]);

  const { data, loading } = useCategoriesQuery({
    fetchPolicy: "cache-and-network",
    variables: { search, after, first },
  });

  return (
    <CategoryListPage
      disabled={loading}
      toggle={toggle}
      toggleAll={toggleAll}
      categories={mapEdgesToItems(data?.categories)}
      selected={listElements.length}
      isChecked={isSelected}
      toolbar={
        <IconButton
          variant="secondary"
          color="primary"
          onClick={() => {
            console.log("delete");
          }}
        >
          <DeleteIcon />
        </IconButton>
      }
      onSearchChange={handleSearch}
      initialSearch={search}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
      pageInfo={data?.categories?.pageInfo}
    />
  );
};

export default CategoryList;
