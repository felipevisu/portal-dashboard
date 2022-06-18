import React from "react";
import { Link, useLocation } from "react-router-dom";

const ITEMS = [
  { label: "Homepage", path: "/admin" },
  { label: "Veículos", path: "/admin/vehicles" },
  { label: "Categorias", path: "/admin/categories" },
  { label: "Segmentos", path: "/admin/segments" },
  { label: "Prestadores de serviço", path: "/admin/providers" },
];

type ItemProps = { label: string; path: string; active: boolean };

const isActive = (path: string, location: string) => {
  if (path === "/admin") {
    return path === location;
  }
  return location.includes(path);
};

export const Item = ({ label, path, active }: ItemProps) => {
  const activeClass = "bg-blue-100 hover:bg-blue-200 text-blue-600";
  const defaultClass =
    "block px-6 py-3 mb-2 rounded-full hover:bg-gray-100 font-medium";
  return (
    <li>
      <Link to={path} className={`${defaultClass} ${active && activeClass}`}>
        {label}
      </Link>
    </li>
  );
};

export const Menu = () => {
  const location = useLocation();

  return (
    <div style={{ width: "300px" }}>
      <ul className="pr-8">
        {ITEMS.map((item) => (
          <Item
            key={item.path}
            {...item}
            active={isActive(item.path, location.pathname)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
