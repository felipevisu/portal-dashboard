import React from "react";
import { ListActions, PaginateListProps, SearchPageProps } from "@portal/types";
import { CategoryFragment } from "@portal/graphql";
import { SearchBar } from "@portal/components/SearchBar";
import PageHeader from "@portal/components/PageHeader";
import { Button } from "@portal/components/Button";
import { Pagination } from "../../components";
import { Card } from "@material-ui/core";
import Container from "@portal/components/Container";
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
  return (
    <Container>
      <PageHeader title={"Categorias"}>
        <Button
          variant="primary"
          href={"/admin/categories/create"}
          data-test-id="create-category"
        >
          Nova categoria
        </Button>
      </PageHeader>
      <Card>
        <SearchBar placeholder="Pesquisar" onSearchChange={onSearchChange} />
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
    </Container>
  );
};

export default CategoryListPage;
