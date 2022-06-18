import React from "react";
import {
  FilterOpts,
  ListActions,
  PaginateListProps,
  SearchPageProps,
} from "@portal/types";
import { ProviderFragment } from "@portal/graphql";
import { FilterBar } from "@portal/components/FilterBar";
import PageHeader from "@portal/components/PageHeader";
import { Button } from "@portal/components/Button";
import { Pagination } from "@portal/components/Pagination";
import { Card } from "@mui/material";
import Container from "@portal/components/Container";
import ProviderList from "./ProviderList";

export type ProviderListFilterOpts = {
  isPublished: FilterOpts<string>;
  segment: FilterOpts<string>;
};

interface ProviderListPageProps
  extends ListActions,
    SearchPageProps,
    PaginateListProps {
  providers: ProviderFragment[];
  disabled: boolean;
  filterOpts: ProviderListFilterOpts;
}

export const ProviderListPage = ({
  providers,
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
}: ProviderListPageProps) => {
  return (
    <Container>
      <PageHeader title={"Prestador de serviço"}>
        <Button
          color="primary"
          variant="contained"
          href={"/admin/providers/create"}
        >
          Criar prestador
        </Button>
      </PageHeader>
      <Card>
        <FilterBar<ProviderListFilterOpts>
          placeholder="Pesquisar"
          onSearchChange={onSearchChange}
          filterOpts={filterOpts}
        />
        <ProviderList
          selected={selected}
          providers={providers}
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

export default ProviderListPage;
