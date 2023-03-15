import React from "react";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

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

interface SessionListPageProps
  extends ListActions,
    SearchPageProps,
    PaginateListProps {
  sessions: SessionFragment[];
  disabled: boolean;
  filterOpts: FilterOpts[];
}

export const SessionListPage = ({
  sessions,
  onSearchChange,
  pageInfo,
  selected,
  toolbar,
  search,
  toggle,
  toggleAll,
  isChecked,
  onNextPage,
  onPreviousPage,
  disabled,
  filterOpts,
}: SessionListPageProps) => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title={t("session.plural")}>
        <Button color="primary" variant="contained" href={"/sessions/create"}>
          {t("session.create")}
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          onSearchChange={onSearchChange}
          filterOpts={filterOpts}
          search={search}
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
