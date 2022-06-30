import React from "react";
import { TableCell, TableBody } from "@mui/material";
import ResponsiveTable from "@portal/components/ResponsiveTable";
import { SegmentFragment } from "@portal/graphql";
import TableHead from "@portal/components/TableHead";
import { renderCollection } from "@portal/misc";
import TableRowLink from "@portal/components/TableRowLink";
import { ListActions } from "@portal/types";
import Checkbox from "@portal/components/Checkbox";
import TableCellHeader from "@portal/components/TableCell";

interface SegmentListProps extends ListActions {
  segments: SegmentFragment[];
  disabled: boolean;
}

export const SegmentList = ({
  segments,
  isChecked,
  toggle,
  disabled,
  toggleAll,
  selected,
  toolbar,
}: SegmentListProps) => {
  const numberOfColumns = segments?.length === 0 ? 2 : 3;

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={segments}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader sx={{ width: "auto" }}>Nome</TableCellHeader>
        <TableCellHeader sx={{ width: 160, textAlign: "center" }}>
          Provedores
        </TableCellHeader>
      </TableHead>
      <TableBody>
        {renderCollection(segments, (segment) => {
          const isSelected = segment ? isChecked(segment.id) : false;
          return (
            <TableRowLink
              key={segment ? segment.id : "skeleton"}
              sx={{ cursor: "pointer" }}
              selected={isSelected}
              href={`details/${segment.id}/`}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected}
                  disabled={disabled}
                  disableClickPropagation
                  onChange={() => toggle(segment.id)}
                />
              </TableCell>
              <TableCell sx={{ width: "auto" }}>{segment.name}</TableCell>
              <TableCell sx={{ width: 160, textAlign: "center" }}>
                {segment.providers.totalCount}
              </TableCell>
            </TableRowLink>
          );
        })}
      </TableBody>
    </ResponsiveTable>
  );
};

export default SegmentList;
