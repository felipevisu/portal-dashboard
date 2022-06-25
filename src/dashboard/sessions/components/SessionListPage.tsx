import React from "react";
import {
  FilterOpts,
  ListActions,
  PaginateListProps,
  SearchPageProps,
} from "@portal/types";
import { SessionFragment } from "@portal/graphql";
import PageHeader from "@portal/components/PageHeader";
import { Button } from "@portal/components/Button";
import { Pagination } from "@portal/components/Pagination";
import { Card } from "@mui/material";
import Container from "@portal/components/Container";
import SessionList from "./SessionList";
import FilterBar from "@portal/components/FilterBar";

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
    <Container>
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
    </Container>
  );
};

export default SessionListPage;
