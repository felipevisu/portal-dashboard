import React from "react";
import { ListActions, PaginateListProps, SearchPageProps } from "@portal/types";
import { SessionFragment } from "@portal/graphql";
import { SearchBar } from "@portal/components/SearchBar";
import PageHeader from "@portal/components/PageHeader";
import { Button } from "@portal/components/Button";
import { Pagination } from "@portal/components/Pagination";
import { Card } from "@mui/material";
import Container from "@portal/components/Container";
import SessionList from "./SessionList";

interface SessionListPageProps
  extends ListActions,
    SearchPageProps,
    PaginateListProps {
  sessions: SessionFragment[];
  disabled: boolean;
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
        <SearchBar placeholder="Pesquisar" onSearchChange={onSearchChange} />
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
