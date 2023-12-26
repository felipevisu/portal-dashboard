import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { EntryTypeFragment } from "@portal/graphql";
import useLinks from "@portal/hooks/useLinks";
import { PaginateListProps } from "@portal/types";

import EntryTypeList from "./EntryTypeList";

interface EntryTypeListPageProps extends PaginateListProps {
  entryTypes: EntryTypeFragment[];
  disabled: boolean;
}

export const EntryTypeListPage = ({
  entryTypes,
  pageInfo,
  onNextPage,
  onPreviousPage,
  disabled,
}: EntryTypeListPageProps) => {
  const { t } = useTranslation();
  const { entryTypeCreate } = useLinks();

  return (
    <>
      <PageHeader title={t("entryType.plural")}>
        <Button color="primary" variant="contained" href={entryTypeCreate()}>
          {t("entryType.create")}
        </Button>
      </PageHeader>
      <Card>
        <EntryTypeList entryTypes={entryTypes} disabled={disabled} />
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

export default EntryTypeListPage;
