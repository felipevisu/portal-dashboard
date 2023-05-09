import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { EntryFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { ListActions, PaginateListProps } from "@portal/types";

import EntryList from "./EntryList";

interface EntryListPageProps extends ListActions, PaginateListProps {
  entries: EntryFragment[];
  disabled: boolean;
}

export const EntryListPage = ({
  entries,
  pageInfo,
  selected,
  toolbar,
  toggle,
  toggleAll,
  isChecked,
  onNextPage,
  onPreviousPage,
  disabled,
}: EntryListPageProps) => {
  const { entry: type } = useParams();
  const { t } = useTranslation("translation", { keyPrefix: type });
  const { entryCreate } = useLinks();
  return (
    <>
      <PageHeader title={t("plural")}>
        <Button color="primary" variant="contained" href={entryCreate(type)}>
          {t("create")}
        </Button>
      </PageHeader>
      <Card>
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
