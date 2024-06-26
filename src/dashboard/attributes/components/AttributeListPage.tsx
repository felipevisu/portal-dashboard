import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { AttributeFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { PaginateListProps } from "@portal/types";

import { AttributeList } from "./AttributeList";

interface AttributeListPage extends PaginateListProps {
  attributes: AttributeFragment[];
}

export const AttributeListPage = ({
  loading,
  attributes,
  onNextPage,
  onPreviousPage,
  pageInfo,
}: AttributeListPage) => {
  const { t } = useTranslation();
  const { attributeCreate } = useLinks();
  return (
    <>
      <PageHeader title={t("attribute.plural")}>
        <Button color="primary" variant="contained" href={attributeCreate()}>
          {t("attribute.create")}
        </Button>
      </PageHeader>
      <Card>
        <AttributeList loading={loading} attributes={attributes} />
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

export default AttributeListPage;
