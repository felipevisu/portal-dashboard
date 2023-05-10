import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import { FilterBar } from "@portal/components/FilterBar";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { CategoryFragment } from "@portal/graphql";
import useLinks from "@portal/hooks/useLinks";
import { FilterPageProps, ListActions, PaginateListProps } from "@portal/types";

import CategoryList from "./CategoryList";
import {
  CategoryFilterKeys,
  CategoryListFilterOpts,
  createFilterStructure,
} from "./filters";

interface CategoryListPageProps
  extends ListActions,
    PaginateListProps,
    FilterPageProps<CategoryFilterKeys, CategoryListFilterOpts> {
  categories: CategoryFragment[];
  disabled: boolean;
}

export const CategoryListPage = ({
  categories,
  pageInfo,
  selected,
  toolbar,
  initialSearch,
  filterOpts,
  toggle,
  toggleAll,
  isChecked,
  onNextPage,
  onPreviousPage,
  onSearchChange,
  onFilterChange,
  onFilterReset,
  disabled,
}: CategoryListPageProps) => {
  const { t } = useTranslation();
  const { categoryCreate } = useLinks();

  const filterStructure = createFilterStructure(filterOpts);

  return (
    <>
      <PageHeader title={t("category.plural")}>
        <Button color="primary" variant="contained" href={categoryCreate()}>
          {t("category.create")}
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          initialSearch={initialSearch}
          onSearchChange={onSearchChange}
          searchPlaceholder="Pesquisar"
          filterStructure={filterStructure}
          onFilterChange={onFilterChange}
          onFilterReset={onFilterReset}
        />
        <CategoryList
          selected={selected}
          categories={categories}
          isChecked={isChecked}
          toggle={toggle}
          toggleAll={toggleAll}
          toolbar={toolbar}
          disabled={disabled}
        />
        {pageInfo && (
          <Pagination
            pageInfo={pageInfo}
            onClickNextPage={onNextPage}
            onClickPreviousPage={onPreviousPage}
          />
        )}
      </Card>
    </>
  );
};

export default CategoryListPage;
