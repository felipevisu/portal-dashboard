import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import FilterBar from "@portal/components/FilterBar";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { PluginBaseFragment } from "@portal/graphql";
import { FilterOpts, PaginateListProps, SearchPageProps } from "@portal/types";

import PluginsList from "./PluginList/PluginsList";

interface PluginsListPageProps extends SearchPageProps, PaginateListProps {
  plugins: PluginBaseFragment[];
  filterOpts: FilterOpts[];
}

export const PluginsListPage = ({
  plugins,
  onSearchChange,
  pageInfo,
  onNextPage,
  onPreviousPage,
  filterOpts,
}: PluginsListPageProps) => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title={t("plugin.plural")} />
      <Card>
        <FilterBar
          placeholder={t("search")}
          onSearchChange={onSearchChange}
          filterOpts={filterOpts}
        />
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
