import React from "react";
import { useCategoriesQuery } from "@portal/graphql";
import { mapEdgesToItems } from "@portal/utils/maps";
import CategoryListPage from "../components/CategoryListPage";
import { Pagination, Header } from "../../components";
import { Content, Input, Space } from "@portal/UI";
import { usePaginator, useSearch } from "@portal/hooks";

export const CategoryList = () => {
  const { search, handleSearch } = useSearch();
  const { after, first, handleNextPage, handlePreviousPage } = usePaginator();
  const { data } = useCategoriesQuery({
    fetchPolicy: "cache-and-network",
    variables: { search, after, first },
  });

  return (
    <div>
      <Header
        title="Categorias"
        buttonLabel="Nova categoria"
        buttonPath="/admin/categories/create"
      />
      <Content>
        <Input
          type="text"
          name="search"
          onChange={handleSearch}
          placeholder="Pesquisar"
        />
        <Space />
        <CategoryListPage categories={mapEdgesToItems(data?.categories)} />
        {data?.categories?.pageInfo && (
          <Pagination
            pageInfo={data.categories.pageInfo}
            onClickNextPage={handleNextPage}
            onClickPreviousPage={handlePreviousPage}
          />
        )}
      </Content>
    </div>
  );
};

export default CategoryList;
