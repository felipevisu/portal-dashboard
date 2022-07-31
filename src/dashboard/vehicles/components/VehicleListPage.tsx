import React from "react";

import { Card } from "@mui/material";
import { Button } from "@portal/components/Button";
import { FilterBar } from "@portal/components/FilterBar";
import PageHeader from "@portal/components/PageHeader";
import { Pagination } from "@portal/components/Pagination";
import { VehicleFragment } from "@portal/graphql";
import {
  FilterOpts,
  ListActions,
  PaginateListProps,
  SearchPageProps,
} from "@portal/types";

import VehicleList from "./VehicleList";

export type VehicleListFilterOpts = {
  isPublished: FilterOpts<string>;
  category: FilterOpts<string>;
};

interface VehicleListPageProps
  extends ListActions,
    SearchPageProps,
    PaginateListProps {
  vehicles: VehicleFragment[];
  disabled: boolean;
  filterOpts: VehicleListFilterOpts;
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
  filterOpts,
}: VehicleListPageProps) => {
  return (
    <>
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
        <FilterBar<VehicleListFilterOpts>
          placeholder="Pesquisar"
          onSearchChange={onSearchChange}
          filterOpts={filterOpts}
        />
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
    </>
  );
};

export default VehicleListPage;
