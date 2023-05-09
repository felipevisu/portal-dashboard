import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { CategoryFragment } from "@portal/graphql";
import useLinks from "@portal/hooks/useLinks";
import { ListActions, PaginateListProps } from "@portal/types";

import CategoryList from "./CategoryList";

interface CategoryListPageProps extends ListActions, PaginateListProps {
  categories: CategoryFragment[];
  disabled: boolean;
}

export const CategoryListPage = ({
  categories,
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
