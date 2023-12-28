import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import { FilterBar } from "@portal/components/FilterBar";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { EntryFragment, EntryTypeDetailsFragment } from "@portal/graphql";
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
  entryType: EntryTypeDetailsFragment;
  disabled: boolean;
}

export const EntryListPage = ({
  entries,
  entryType,
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
  onFilterReset,
  onFilterAttributeFocus,
}: EntryListPageProps) => {
  const { entryTypeId } = useParams();
  const { t } = useTranslation();
  const { entryCreate } = useLinks();

  const filterStructure = createFilterStructure(filterOpts);

  return (
    <>
      <PageHeader title={entryType.name}>
        <Button
          color="primary"
          variant="contained"
          href={entryCreate(entryTypeId)}
        >
          {t("entry.create")}
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          initialSearch={initialSearch}
          onSearchChange={onSearchChange}
          searchPlaceholder="Pesquisar"
          filterStructure={filterStructure}
          onFilterChange={onFilterChange}
          onFilterReset={onFilterReset}
          onFilterAttributeFocus={onFilterAttributeFocus}
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
