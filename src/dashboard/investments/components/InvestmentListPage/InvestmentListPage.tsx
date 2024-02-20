import React from "react";
import { useTranslation } from "react-i18next";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { InvestmentFragment } from "@portal/graphql";
import { FilterPageProps, ListActions, PaginateListProps } from "@portal/types";

import InvestmentList from "../InvestmentList";
import { useLinks } from "@portal/hooks";
import {
  InvestmentFilterKeys,
  InvestmentListFilterOpts,
  createFilterStructure,
} from "./filters";
import FilterBar from "@portal/components/FilterBar";
import Filter from "@portal/components/Filter";
import { Root } from "@portal/components/FilterBar/styles";

interface InvestmentListPageProps
  extends ListActions,
    PaginateListProps,
    FilterPageProps<InvestmentFilterKeys, InvestmentListFilterOpts> {
  investments: InvestmentFragment[];
  disabled: boolean;
}

export const InvestmentListPage = ({
  investments,
  pageInfo,
  selected,
  toolbar,
  filterOpts,
  toggle,
  toggleAll,
  isChecked,
  onNextPage,
  onPreviousPage,
  onFilterChange,
  onFilterReset,
  disabled,
}: InvestmentListPageProps) => {
  const { t } = useTranslation();
  const { investmentCreate } = useLinks();

  const filterStructure = createFilterStructure(filterOpts);

  return (
    <>
      <PageHeader title={t("investment.plural")}>
        <Button color="primary" variant="contained" href={investmentCreate()}>
          {t("investment.create")}
        </Button>
      </PageHeader>
      <Card>
        <Root>
          <Filter
            menu={filterStructure}
            onFilterAdd={onFilterChange}
            onFilterReset={onFilterReset}
          />
        </Root>
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
