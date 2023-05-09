import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { PluginBaseFragment } from "@portal/graphql";
import { PaginateListProps } from "@portal/types";

import PluginsList from "./PluginList/PluginsList";

interface PluginsListPageProps extends PaginateListProps {
  plugins: PluginBaseFragment[];
}

export const PluginsListPage = ({
  plugins,
  pageInfo,
  onNextPage,
  onPreviousPage,
}: PluginsListPageProps) => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title={t("plugin.plural")} />
      <Card>
        <PluginsList plugins={plugins} />
        {pageInfo && (
          <Pagination
            pageInfo={pageInfo}
            onClickNextPage={onNextPage}
            onClickPreviousPage={onPreviousPage}
          />
        )}
      </Card>
    </>
  );
};

export default PluginsListPage;
