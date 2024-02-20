import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { SessionFragment } from "@portal/graphql";
import { FilterPageProps, ListActions, PaginateListProps } from "@portal/types";

import SessionList from "./SessionList";
import {
  SessionFilterKeys,
  SessionListFilterOpts,
  createFilterStructure,
} from "./filter";
import FilterBar from "@portal/components/FilterBar";

interface SessionListPageProps
  extends ListActions,
    PaginateListProps,
    FilterPageProps<SessionFilterKeys, SessionListFilterOpts> {
  sessions: SessionFragment[];
  disabled: boolean;
}

export const SessionListPage = ({
  sessions,
  pageInfo,
  selected,
  toolbar,
  initialSearch,
  filterOpts,
  onFilterChange,
  onFilterReset,
  onSearchChange,
  toggle,
  toggleAll,
  isChecked,
  onNextPage,
  onPreviousPage,
  disabled,
}: SessionListPageProps) => {
  const { t } = useTranslation();

  const filterStructure = createFilterStructure(filterOpts);

  return (
    <>
      <PageHeader title={t("session.plural")}>
        <Button color="primary" variant="contained" href={"/sessions/create"}>
          {t("session.create")}
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
