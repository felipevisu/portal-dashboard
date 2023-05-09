import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { DocumentFragment } from "@portal/graphql";
import { ListActions, PaginateListProps } from "@portal/types";

import DocumentList from "./DocumentList";

interface DocumentListPageProps extends ListActions, PaginateListProps {
  documents: DocumentFragment[];
  disabled: boolean;
}

export const DocumentListPage = ({
  documents,
  pageInfo,
  selected,
  disabled,
  toolbar,
  toggle,
  toggleAll,
  isChecked,
  onNextPage,
  onPreviousPage,
}: DocumentListPageProps) => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title={t("document.plural")} />
      <Card>
        <DocumentList
          selected={selected}
          documents={documents}
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
