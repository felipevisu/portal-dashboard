import React from "react";
import { Link } from "react-router-dom";
import { useCategoriesQuery } from "@portal/graphql";
import { Container } from "@portal/UI";
import CategoryListPage from "../components/CategoryListPage";
import { mapEdgesToItems } from "@portal/utils/maps";

export const CategoryList = () => {
  const { data, loading, refetch } = useCategoriesQuery({
    fetchPolicy: "cache-and-network",
  });

  return (
    <Container>
      <h1>Categorias</h1>
      <Link to="/admin/categories/create">Nova categoria</Link>
      <CategoryListPage categories={mapEdgesToItems(data?.categories)} />
    </Container>
  );
};

export default CategoryList;
