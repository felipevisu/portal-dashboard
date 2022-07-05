import React from "react";
import { Button } from "@portal/components/Button";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { InvestmentFragment } from "@portal/graphql";
import { ListActions, PaginateListProps } from "@portal/types";
import { Card } from "@mui/material";
import { Pagination } from "@portal/components/Pagination";
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
  return (
    <Container>
      <PageHeader title={"Prestadores de serviço"}>
        <Button
          color="primary"
          variant="contained"
          href={"/admin/investments/create"}
        >
          Criar investimento
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
    </Container>
  );
};

export default InvestmentListPage;
