import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { FilterBar } from "@portal/components/FilterBar";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { DocumentFragment } from "@portal/graphql";
import { FilterPageProps, ListActions, PaginateListProps } from "@portal/types";

import DocumentList from "./DocumentList";
import {
  createFilterStructure,
  DocumentFilterKeys,
  DocumentListFilterOpts,
} from "./filters";

interface DocumentListPageProps
  extends ListActions,
    PaginateListProps,
    FilterPageProps<DocumentFilterKeys, DocumentListFilterOpts> {
  documents: DocumentFragment[];
  disabled: boolean;
}

export const DocumentListPage = ({
  documents,
  pageInfo,
  selected,
  disabled,
  toolbar,
  initialSearch,
  filterOpts,
  toggle,
  toggleAll,
  isChecked,
  onNextPage,
  onPreviousPage,
  onSearchChange,
  onFilterChange,
  onFilterReset,
}: DocumentListPageProps) => {
  const { t } = useTranslation();

  const filterStructure = createFilterStructure(filterOpts);

  return (
    <>
      <PageHeader title={t("document.plural")} />
      <Card>
        <FilterBar
          initialSearch={initialSearch}
          onSearchChange={onSearchChange}
          searchPlaceholder="Pesquisar"
          filterStructure={filterStructure}
          onFilterChange={onFilterChange}
          onFilterReset={onFilterReset}
        />
        <DocumentList
          selected={selected}
          documents={documents}
          isChecked={isChecked}
          toggle={toggle}
          toggleAll={toggleAll}
          toolbar={toolbar}
          disabled={disabled}
        />
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
