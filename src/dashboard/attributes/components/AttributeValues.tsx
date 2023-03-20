import React from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { Delete } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button } from "@portal/components/Button";
import { Pagination } from "@portal/components/Pagination";
import TableCellHeader from "@portal/components/TableCell";
import { AttributeValueFragment, PageInfoFragment } from "@portal/graphql";

interface AttributeValuesProps {
  onDeleteValue: () => void;
  onCreateValue: () => void;
  values: Partial<AttributeValueFragment>[];
  pageInfo?: PageInfoFragment;
  onNext?: (val: string) => void;
  onPrev?: (val: string) => void;
}

const defaultPageInfo: PageInfoFragment = {
  __typename: "PageInfo",
  endCursor: "",
  hasNextPage: false,
  hasPreviousPage: false,
  startCursor: "",
};

export const AttributeValues = ({
  onDeleteValue,
  onCreateValue,
  values,
  pageInfo = defaultPageInfo,
  onNext,
  onPrev,
}: AttributeValuesProps) => {
  const { t } = useTranslation();
  const [, setSearchParams] = useSearchParams();

  const handleValueDelete = (id: string) => {
    setSearchParams({ id });
    onDeleteValue();
  };

  return (
    <Card>
      <CardHeader
        title={t("attribute.values.title")}
        action={
          <Button onClick={onCreateValue} color="primary" variant="outlined">
            Adicionar valor
          </Button>
        }
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCellHeader>{t("name")}</TableCellHeader>
            <TableCellHeader>{t("value")}</TableCellHeader>
            <TableCellHeader align="right">{t("delete")}</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {!values.length && (
            <TableRow>
              <TableCell
                colSpan={3}
                sx={{ textAlign: "center", height: "64px" }}
              >
                {t("empty")}
              </TableCell>
            </TableRow>
          )}
          {values.map((item, index) => (
            <TableRow key={index}>
              <TableCell sx={{ paddingLeft: 3 }}>{item.name}</TableCell>
              <TableCell>{item.slug}</TableCell>
              <TableCell align="right" sx={{ paddingRight: 3 }}>
                <IconButton onClick={() => handleValueDelete(item.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        pageInfo={pageInfo}
        onClickNextPage={onNext}
        onClickPreviousPage={onPrev}
      />
    </Card>
  );
};

export default AttributeValues;
