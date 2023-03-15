import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import FilterBar from "@portal/components/FilterBar";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { CategoryFragment } from "@portal/graphql";
import useLinks from "@portal/hooks/useLinks";
import {
  FilterOpts,
  ListActions,
  PaginateListProps,
  SearchPageProps,
} from "@portal/types";

import CategoryList from "./CategoryList";

interface CategoryListPageProps
  extends ListActions,
    SearchPageProps,
    PaginateListProps {
  categories: CategoryFragment[];
  disabled: boolean;
  filterOpts: FilterOpts[];
}

export const CategoryListPage = ({
  categories,
  onSearchChange,
  pageInfo,
  selected,
  toolbar,
  filterOpts,
  toggle,
  toggleAll,
  isChecked,
  onNextPage,
  onPreviousPage,
  disabled,
  search,
}: CategoryListPageProps) => {
  const { t } = useTranslation();
  const { categoryCreate } = useLinks();

  return (
    <>
      <PageHeader title={t("category.plural")}>
        <Button color="primary" variant="contained" href={categoryCreate()}>
          {t("category.create")}
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          onSearchChange={onSearchChange}
          filterOpts={filterOpts}
          search={search}
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
