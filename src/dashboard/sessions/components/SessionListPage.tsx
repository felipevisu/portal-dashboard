import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { SessionFragment } from "@portal/graphql";
import { ListActions, PaginateListProps } from "@portal/types";

import SessionList from "./SessionList";

interface SessionListPageProps extends ListActions, PaginateListProps {
  sessions: SessionFragment[];
  disabled: boolean;
}

export const SessionListPage = ({
  sessions,
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
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title={t("session.plural")}>
        <Button color="primary" variant="contained" href={"/sessions/create"}>
          {t("session.create")}
        </Button>
      </PageHeader>
      <Card>
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
