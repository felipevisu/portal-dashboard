import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import { FilterBar } from "@portal/components/FilterBar";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { EntryFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { FilterPageProps, ListActions, PaginateListProps } from "@portal/types";

import EntryList from "../EntryList";

import {
  createFilterStructure,
  EntryFilterKeys,
  EntryListFilterOpts,
} from "./filters";

interface EntryListPageProps
  extends ListActions,
    PaginateListProps,
    FilterPageProps<EntryFilterKeys, EntryListFilterOpts> {
  entries: EntryFragment[];
  disabled: boolean;
}

export const EntryListPage = ({
  entries,
  pageInfo,
  selected,
  toolbar,
  disabled,
  initialSearch,
  filterOpts,
  toggle,
  toggleAll,
  isChecked,
  onNextPage,
  onPreviousPage,
  onSearchChange,
  onFilterChange,
}: EntryListPageProps) => {
  const { entry: type } = useParams();
  const { t } = useTranslation("translation", { keyPrefix: type });
  const { entryCreate } = useLinks();

  const filterStructure = createFilterStructure(filterOpts);

  return (
    <>
      <PageHeader title={t("plural")}>
        <Button color="primary" variant="contained" href={entryCreate(type)}>
          {t("create")}
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          initialSearch={initialSearch}
          onSearchChange={onSearchChange}
          searchPlaceholder="Pesquisar"
          filterStructure={filterStructure}
          onFilterChange={onFilterChange}
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
