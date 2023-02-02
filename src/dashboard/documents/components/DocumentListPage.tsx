import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import FilterBar from "@portal/components/FilterBar";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { DocumentFragment } from "@portal/graphql";
import {
  FilterOpts,
  ListActions,
  PaginateListProps,
  SearchPageProps,
} from "@portal/types";

import DocumentList from "./DocumentList";

interface DocumentListPageProps
  extends ListActions,
    SearchPageProps,
    PaginateListProps {
  documents: DocumentFragment[];
  disabled: boolean;
  filterOpts: FilterOpts[];
}

export const DocumentListPage = ({
  documents,
  pageInfo,
  selected,
  disabled,
  toolbar,
  filterOpts,
  toggle,
  toggleAll,
  isChecked,
  onNextPage,
  onPreviousPage,
  onSearchChange,
}: DocumentListPageProps) => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title={t("documents")} />
      <Card>
        <FilterBar
          placeholder={t("search")}
          onSearchChange={onSearchChange}
          filterOpts={filterOpts}
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
