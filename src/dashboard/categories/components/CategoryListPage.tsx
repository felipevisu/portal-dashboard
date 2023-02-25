import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import SearchBar from "@portal/components/SearchBar";
import { CategoryFragment } from "@portal/graphql";
import { ListActions, PaginateListProps, SearchPageProps } from "@portal/types";

import CategoryList from "./CategoryList";

interface CategoryListPageProps
  extends ListActions,
    SearchPageProps,
    PaginateListProps {
  categories: CategoryFragment[];
  disabled: boolean;
}

export const CategoryListPage = ({
  categories,
  onSearchChange,
  pageInfo,
  selected,
  toolbar,
  toggle,
  toggleAll,
  isChecked,
  onNextPage,
  onPreviousPage,
  disabled,
}: CategoryListPageProps) => {
  const { t } = useTranslation("translation", { keyPrefix: "category" });
  return (
    <>
      <PageHeader title={t("title")}>
        <Button color="primary" variant="contained" href={"/categories/create"}>
          {t("create")}
        </Button>
      </PageHeader>
      <Card>
        <SearchBar onSearchChange={onSearchChange} />
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
