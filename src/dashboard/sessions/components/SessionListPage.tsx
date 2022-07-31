import React from "react";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import FilterBar from "@portal/components/FilterBar";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { SessionFragment } from "@portal/graphql";
import {
  FilterOpts,
  ListActions,
  PaginateListProps,
  SearchPageProps,
} from "@portal/types";

import SessionList from "./SessionList";

export type SessionListFilterOpts = {
  isPublished: FilterOpts<string>;
};

interface SessionListPageProps
  extends ListActions,
    SearchPageProps,
    PaginateListProps {
  sessions: SessionFragment[];
  disabled: boolean;
  filterOpts: SessionListFilterOpts;
}

export const SessionListPage = ({
  sessions,
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
}: SessionListPageProps) => {
  return (
    <>
      <PageHeader title={"Sessões públicas"}>
        <Button
          color="primary"
          variant="contained"
          href={"/admin/sessions/create"}
        >
          Criar sessão
        </Button>
      </PageHeader>
      <Card>
        <FilterBar<SessionListFilterOpts>
          placeholder="Pesquisar"
          onSearchChange={onSearchChange}
          filterOpts={filterOpts}
        />
        <SessionList
          selected={selected}
          sessions={sessions}
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

export default SessionListPage;
