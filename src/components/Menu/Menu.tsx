import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Label, MenuContent, MenuItem, MenuMain, SubMenuItem } from "./styles";
import useAppMenu from "../AppLayout/AppMenuContext";

type ItemProps = {
  label: string;
  path: string;
  icon?: React.ReactNode | string;
  active: boolean;
  subItems?: {
    label: string;
    path: string;
  }[];
};

const isActive = (path: string, location: string) => {
  if (path === "/") {
    return path === location;
  }
  return location.includes(path);
};

export const Item = ({ label, path, icon, active, subItems }: ItemProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(subItems?.some((item) => isActive(item.path, location.pathname)));
  }, [location, subItems]);

  return (
    <li>
      {subItems?.length ? (
        <MenuItem active={open} onClick={() => setOpen(!open)}>
          {icon}
          <Label>{label}</Label>
        </MenuItem>
      ) : (
        <Link to={path}>
          <MenuItem active={active}>
            {icon}
            <Label>{label}</Label>
          </MenuItem>
        </Link>
      )}
      {open && subItems?.length && (
        <ul>
          {subItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>
                <SubMenuItem active={isActive(item.path, location.pathname)}>
                  {item.label}
                </SubMenuItem>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export const Menu = ({ opened }: { opened: boolean }) => {
  const location = useLocation();
  const { menus } = useAppMenu();

  return (
    <MenuMain>
      <MenuContent opened={opened}>
        <ul>
          {menus.map((item) => (
            <Item
              key={item.path}
              {...item}
              active={isActive(item.path, location.pathname)}
              subItems={item.subItems}
            />
          ))}
        </ul>
      </MenuContent>
    </MenuMain>
  );
};

export default Menu;
