import React, { createContext } from "react";
import i18n from "i18next";
import { ChannelFragment, useEntryTypesQuery } from "@portal/graphql";
import { useLinks } from "@portal/hooks";

import AttachMoney from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import EventNoteIcon from "@mui/icons-material/EventNote";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

type MenuItem = { label: string; path: string; icon?: React.ReactNode };

interface UseAppMenu {
  menus: (MenuItem & { subItems?: MenuItem[] })[];
  refetch: () => undefined;
}

const AppMenuContext = createContext({
  menus: [],
  refetch: () => undefined,
});

export const AppMenuProvider: React.FC = ({ children }) => {
  const { t } = i18n;
  const links = useLinks();
  const { data, refetch } = useEntryTypesQuery({ variables: { first: 10 } });

  const entryTypesMenu =
    data?.entryTypes?.edges?.map(({ node }) => ({
      label: node.name,
      path: links.entryList(node.id),
      icon: <DashboardIcon />,
    })) || [];

  const menus = [
    {
      label: t("homepage"),
      path: links.homepage(),
      icon: <DashboardIcon />,
    },
    {
      label: t("category.plural"),
      path: links.categoryList(),
      icon: <CategoryIcon />,
    },
    {
      label: "Cadastros",
      path: "#",
      icon: <DesignServicesIcon />,
      subItems: entryTypesMenu,
    },

    {
      label: t("document.plural"),
      path: links.documentList(),
      icon: <InsertDriveFileIcon />,
    },
    {
      label: t("investment.plural"),
      path: "/investments",
      icon: <AttachMoney />,
    },
    {
      label: t("session.plural"),
      path: "/sessions",
      icon: <EventNoteIcon />,
    },
    {
      label: t("settings"),
      path: "/settings",
      icon: <DisplaySettingsIcon />,
    },
  ];

  return (
    <AppMenuContext.Provider value={{ menus, refetch }}>
      {children}
    </AppMenuContext.Provider>
  );
};

const useAppMenu = (): UseAppMenu => {
  const data = React.useContext(AppMenuContext);
  return data;
};

export default useAppMenu;
