import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import FilterBar from "@portal/components/FilterBar";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { AttributeFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { FilterOpts, PaginateListProps, SearchPageProps } from "@portal/types";

import { AttributeList } from "./AttributeList";

interface AttributeListPage extends SearchPageProps, PaginateListProps {
  attributes: AttributeFragment[];
  onSearch: (search: string) => void;
  filterOpts: FilterOpts[];
}

export const AttributeListPage = ({
  attributes,
  onSearchChange,
  search,
  filterOpts,
  onNextPage,
  onPreviousPage,
  pageInfo,
}: AttributeListPage) => {
  const { t } = useTranslation();
  const { attributeCreate } = useLinks();
  return (
    <>
      <PageHeader title={t("attribute.plural")}>
        <Button color="primary" variant="contained" href={attributeCreate()}>
          {t("attribute.create")}
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          placeholder={t("search")}
          onSearchChange={onSearchChange}
          filterOpts={filterOpts}
          search={search}
        />
        <AttributeList attributes={attributes} />
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

export default AttributeListPage;
