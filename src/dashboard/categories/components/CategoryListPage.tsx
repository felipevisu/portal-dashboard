import { CategoryFragment } from "@portal/graphql";
import React from "react";
import { Link } from "react-router-dom";

interface CategoryListPageProps {
  categories: CategoryFragment[];
}

export const CategoryListPage = ({ categories }: CategoryListPageProps) => {
  return (
    <div>
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>
            <Link to={`/admin/categories/details/${category.id}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryListPage;
