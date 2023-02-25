import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { InvestmentFragment } from "@portal/graphql";
import { ListActions, PaginateListProps } from "@portal/types";

import InvestmentList from "./InvestmentList";

interface InvestmentListPageProps extends ListActions, PaginateListProps {
  investments: InvestmentFragment[];
  disabled: boolean;
}

export const InvestmentListPage = ({
  investments,
  pageInfo,
  selected,
  toolbar,
  toggle,
  toggleAll,
  isChecked,
  onNextPage,
  onPreviousPage,
  disabled,
}: InvestmentListPageProps) => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t("investment.plural")}>
        <Button
          color="primary"
          variant="contained"
          href={"/investments/create"}
        >
          {t("investment.create")}
        </Button>
      </PageHeader>
      <Card>
        <InvestmentList
          selected={selected}
          investments={investments}
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

export default InvestmentListPage;
