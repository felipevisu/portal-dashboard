import ResponsiveTable from "@portal/components/ResponsiveTable";
import { CategoryFragment } from "@portal/graphql";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface CategoryListPageProps {
  categories: CategoryFragment[];
}

export const CategoryListPage = ({ categories }: CategoryListPageProps) => {
  const navigate = useNavigate();
  return (
    <ResponsiveTable>
      <ul>
        {categories?.map((category) => (
          <li
            key={category.id}
            onClick={() => navigate(`/admin/categories/details/${category.id}`)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </ResponsiveTable>
  );
};

export default CategoryListPage;
