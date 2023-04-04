import React from "react";
import { Link as BaseLink } from "react-router-dom";

import { styled, TableRow, TableRowTypeMap } from "@mui/material";
import { isExternalURL } from "@portal/utils/urls";

type MaterialTableRowPropsType = TableRowTypeMap["props"];

const Link = styled(BaseLink)(() => ({ all: "inherit", display: "contents" }));

export interface TableRowLinkProps
  extends Omit<MaterialTableRowPropsType, "onClick"> {
  children: React.ReactNode;
  href?: string;
  className?: string;
  linkClassName?: string;
  onClick?: () => void;
}

const TableRowLink = ({
  href,
  children,
  linkClassName,
  ...props
}: TableRowLinkProps) => {
  if (!href || isExternalURL(href)) {
    return <TableRow {...props}>{children}</TableRow>;
  }

  return (
    <TableRow hover={true} {...props}>
      <Link className={linkClassName} to={href}>
        {children}
      </Link>
    </TableRow>
  );
};

TableRowLink.displayName = "TableRowLink";
export default TableRowLink;
