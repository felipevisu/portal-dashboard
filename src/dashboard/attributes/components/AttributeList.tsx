import React from "react";
import { useTranslation } from "react-i18next";

import { TableBody, TableCell, TableHead } from "@mui/material";
import ResponsiveTable from "@portal/components/ResponsiveTable";
import TableCellHeader from "@portal/components/TableCell";
import TableRowLink from "@portal/components/TableRowLink";
import { AttributeFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { renderCollection } from "@portal/misc";

import { mapInputType, mapType } from "../utils";

interface AttributeListProps {
  attributes: AttributeFragment[];
}

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
              <TableCell>{mapType(t)[attribute.type]}</TableCell>
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
    </ResponsiveTable>
  );
};

export default AttributeList;
