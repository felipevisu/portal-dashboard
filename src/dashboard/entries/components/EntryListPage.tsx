import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import { FilterBar } from "@portal/components/FilterBar";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { EntryFragment } from "@portal/graphql";
import {
  FilterOpts,
  ListActions,
  PaginateListProps,
  SearchPageProps,
} from "@portal/types";

import { useEntryType } from "../hooks";

import EntryList from "./EntryList";

interface EntryListPageProps
  extends ListActions,
    SearchPageProps,
    PaginateListProps {
  entries: EntryFragment[];
  disabled: boolean;
  filterOpts: FilterOpts[];
}

export const EntryListPage = ({
  entries,
  onSearchChange,
  pageInfo,
  selected,
  toolbar,
  toggle,
  toggleAll,
  isChecked,
  onNextPage,
  onPreviousPage,
  disabled,
  filterOpts,
}: EntryListPageProps) => {
  const content = useEntryType();
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title={content.header}>
        <Button
          color="primary"
          variant="contained"
          href={`/admin/${content.link}/create`}
        >
          {content.new}
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          placeholder={t("search")}
          onSearchChange={onSearchChange}
          filterOpts={filterOpts}
        />
        <EntryList
          selected={selected}
          entries={entries}
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

export default EntryListPage;
