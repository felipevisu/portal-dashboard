import React from "react";
import { useCategoriesQuery } from "@portal/graphql";
import { mapEdgesToItems } from "@portal/utils/maps";
import CategoryListPage from "../components/CategoryListPage";
import { Pagination } from "../../components";
import { usePaginator, useSearch } from "@portal/hooks";
import { Card } from "@material-ui/core";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Button } from "@portal/components/Button";
import { SearchBar } from "@portal/components/SearchBar";

export const CategoryList = () => {
  const { search, handleSearch } = useSearch();
  const { after, first, handleNextPage, handlePreviousPage } = usePaginator();
  const { data } = useCategoriesQuery({
    fetchPolicy: "cache-and-network",
    variables: { search, after, first },
  });

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
        <SearchBar placeholder="Pesquisar" onChangeSearch={handleSearch} />
        <CategoryListPage categories={mapEdgesToItems(data?.categories)} />
        {data?.categories?.pageInfo && (
          <Pagination
            pageInfo={data.categories.pageInfo}
            onClickNextPage={handleNextPage}
            onClickPreviousPage={handlePreviousPage}
          />
        )}
      </Card>
    </Container>
  );
};

export default CategoryList;
