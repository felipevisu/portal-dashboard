import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { CategoryFragment } from "@portal/graphql";
import useLinks from "@portal/hooks/useLinks";
import { PaginateListProps, SearchPageProps } from "@portal/types";

import CategoryList from "./CategoryList";

import SearchBar from "@portal/components/SearchBar";

interface CategoryListPageProps extends PaginateListProps, SearchPageProps {
  categories: CategoryFragment[];
  disabled: boolean;
}

export const CategoryListPage = ({
  categories,
  pageInfo,
  initialSearch,
  onNextPage,
  onPreviousPage,
  onSearchChange,
  disabled,
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
        <SearchBar
          initialSearch={initialSearch}
          onSearchChange={onSearchChange}
          searchPlaceholder="Pesquisar"
        />
        <CategoryList categories={categories} disabled={disabled} />
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
