import React from "react";
import { useTranslation } from "react-i18next";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import TableCellHeader from "@portal/components/TableCell";
import TableRowLink from "@portal/components/TableRowLink";
import { AttributeFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { renderCollection } from "@portal/misc";

import { mapInputType } from "../utils";
import EmptyTable from "@portal/components/EmptyTable";

interface AttributeListProps {
  loading: boolean;
  attributes: AttributeFragment[];
}

export const AttributeList = ({ loading, attributes }: AttributeListProps) => {
  const { t } = useTranslation();
  const { attributeDetails } = useLinks();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCellHeader>{t("attribute.fields.name")}</TableCellHeader>
          <TableCellHeader>{t("attribute.fields.inputType")}</TableCellHeader>
          <TableCellHeader>
            {t("attribute.fields.visibleInWebsite")}
          </TableCellHeader>
          <TableCellHeader>
            {t("attribute.fields.valueRequired")}
          </TableCellHeader>
        </TableHead>
        <TableBody>
          {!loading && !attributes.length && <EmptyTable colSpan={5} />}
          {renderCollection(attributes, (attribute) => {
            return (
              <TableRowLink
                key={attribute ? attribute.id : "skeleton"}
                sx={{ cursor: "pointer" }}
                href={attributeDetails(attribute.id)}
              >
                <TableCell sx={{ paddingLeft: 3 }}>{attribute.name}</TableCell>
                <TableCell>{mapInputType(t)[attribute.inputType]}</TableCell>
                <TableCell>
                  {attribute.visibleInWebsite
                    ? t("boolean.yes")
                    : t("boolean.no")}
                </TableCell>
                <TableCell>
                  {attribute.valueRequired ? t("boolean.yes") : t("boolean.no")}
                </TableCell>
              </TableRowLink>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttributeList;
