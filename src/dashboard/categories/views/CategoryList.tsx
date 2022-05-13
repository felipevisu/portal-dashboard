import React from "react";
import { useCategoriesQuery } from "@portal/graphql";
import CategoryListPage from "../components/CategoryListPage";
import { mapEdgesToItems } from "@portal/utils/maps";
import { Content, Header } from "@portal/UI";

export const CategoryList = () => {
  const { data } = useCategoriesQuery({
    fetchPolicy: "cache-and-network",
  });

  return (
    <div>
      <Header
        title="Categorias"
        buttonLabel="Nova categoria"
        buttonPath="/admin/categories/create"
      />
      <Content>
        <CategoryListPage categories={mapEdgesToItems(data?.categories)} />
      </Content>
    </div>
  );
};

export default CategoryList;
