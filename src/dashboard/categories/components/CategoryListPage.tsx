import { CategoryFragment } from "@portal/graphql";
import { ListItem } from "@portal/UI";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface CategoryListPageProps {
  categories: CategoryFragment[];
}

export const CategoryListPage = ({ categories }: CategoryListPageProps) => {
  const navigate = useNavigate();
  return (
    <div>
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>
            <ListItem
              label={category.name}
              onEdit={() =>
                navigate(`/admin/categories/details/${category.id}`)
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryListPage;
