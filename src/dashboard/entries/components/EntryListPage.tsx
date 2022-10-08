import React from "react";

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

import EntryList from "./EntryList";

interface EntryListPageProps
  extends ListActions,
    SearchPageProps,
    PaginateListProps {
  entries: EntryFragment[];
  disabled: boolean;
  filterOpts: FilterOpts[];
}

const content = {
  vehicle: {
    title: "Veículos de comunicação",
    link: "vehicles",
    new: "Novo veículo",
  },
  provider: {
    title: "Prestadores de serviço",
    link: "providers",
    new: "Novo prestador",
  },
};

const getContent = (pathname: string) =>
  pathname.includes("vehicle") ? content.vehicle : content.provider;

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
  const content = getContent(window.location.pathname);

  return (
    <>
      <PageHeader title={content.title}>
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
          placeholder="Pesquisar"
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
