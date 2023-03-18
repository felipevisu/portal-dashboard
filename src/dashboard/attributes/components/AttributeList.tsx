import React from "react";
import { useTranslation } from "react-i18next";

import { TableBody, TableCell, TableHead } from "@mui/material";
import ResponsiveTable from "@portal/components/ResponsiveTable";
import TableCellHeader from "@portal/components/TableCell";
import TableRowLink from "@portal/components/TableRowLink";
import { AttributeFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { renderCollection } from "@portal/misc";

interface AttributeListProps {
  attributes: AttributeFragment[];
}

const mapType = {
  ENTRY: "Veículo/Fornecedor",
  DOCUMENT: "Document",
};

const mapInputType = {
  DROPDOWN: "Seleção",
  MULTISELECT: "Multi seleção",
  FILE: "Arquivo",
  NUMERIC: "Numérico",
  PLAIN_TEXT: "Texto",
  SWATCH: "swatch",
  BOOLEAN: "Booleano",
  DATE: "Data",
  DATE_TIME: "Data e hora",
};

export const AttributeList = ({ attributes }: AttributeListProps) => {
  const { t } = useTranslation();
  const { attributeDetails } = useLinks();

  return (
    <ResponsiveTable>
      <TableHead>
        <TableCellHeader>{t("attribute.fields.name")}</TableCellHeader>
        <TableCellHeader>{t("attribute.fields.type")}</TableCellHeader>
        <TableCellHeader>{t("attribute.fields.inputType")}</TableCellHeader>
        <TableCellHeader>
          {t("attribute.fields.visibleInWebsite")}
        </TableCellHeader>
        <TableCellHeader>{t("attribute.fields.valueRequired")}</TableCellHeader>
      </TableHead>
      <TableBody>
        {renderCollection(attributes, (attribute) => {
          return (
            <TableRowLink
              key={attribute ? attribute.id : "skeleton"}
              sx={{ cursor: "pointer" }}
              href={attributeDetails(attribute.id)}
            >
              <TableCell>{attribute.name}</TableCell>
              <TableCell>{mapType[attribute.type]}</TableCell>
              <TableCell>{mapInputType[attribute.inputType]}</TableCell>
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
    </ResponsiveTable>
  );
};

export default AttributeList;
