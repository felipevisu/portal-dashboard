import React from "react";
import { ListActions, PaginateListProps, SearchPageProps } from "@portal/types";
import { SegmentFragment } from "@portal/graphql";
import { SearchBar } from "@portal/components/SearchBar";
import PageHeader from "@portal/components/PageHeader";
import { Button } from "@portal/components/Button";
import { Pagination } from "@portal/components/Pagination";
import { Card } from "@mui/material";
import Container from "@portal/components/Container";
import SegmentList from "./SegmentList";

interface SegmentListPageProps
  extends ListActions,
    SearchPageProps,
    PaginateListProps {
  segments: SegmentFragment[];
  disabled: boolean;
}

export const SegmentListPage = ({
  segments,
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
}: SegmentListPageProps) => {
  return (
    <Container>
      <PageHeader title={"Segmentos"}>
        <Button
          color="primary"
          variant="contained"
          href={"/admin/segments/create"}
        >
          Criar segmento
        </Button>
      </PageHeader>
      <Card>
        <SearchBar placeholder="Pesquisar" onSearchChange={onSearchChange} />
        <SegmentList
          selected={selected}
          segments={segments}
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

export default SegmentListPage;
