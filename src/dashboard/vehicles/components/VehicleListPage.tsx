import React from "react";
import { ListActions, PaginateListProps, SearchPageProps } from "@portal/types";
import { VehicleFragment } from "@portal/graphql";
import { FilterBar } from "@portal/components/FilterBar";
import PageHeader from "@portal/components/PageHeader";
import { Button } from "@portal/components/Button";
import { Pagination } from "@portal/components/Pagination";
import { Card } from "@mui/material";
import Container from "@portal/components/Container";
import VehicleList from "./VehicleList";

interface VehicleListPageProps
  extends ListActions,
    SearchPageProps,
    PaginateListProps {
  vehicles: VehicleFragment[];
  disabled: boolean;
}

export const VehicleListPage = ({
  vehicles,
  onSearchChange,
  pageInfo,
  selected,
  toolbar,
  toggle,
  toggleAll,
  isChecked,
  onNextPage,
  onPreviousPage,
  disabled,
}: VehicleListPageProps) => {
  return (
    <Container>
      <PageHeader title={"Veículos"}>
        <Button
          color="primary"
          variant="contained"
          href={"/admin/vehicles/create"}
        >
          Criar veículo
        </Button>
      </PageHeader>
      <Card>
        <FilterBar placeholder="Pesquisar" onSearchChange={onSearchChange} />
        <VehicleList
          selected={selected}
          vehicles={vehicles}
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

export default VehicleListPage;
