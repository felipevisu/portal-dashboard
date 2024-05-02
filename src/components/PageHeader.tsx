import React from "react";

import { Skeleton, Typography } from "@mui/material";

import ExtendedPageHeader from "./ExtendedPageHeader";

interface PageHeaderProps {
  children?: React.ReactNode;
  className?: string;
  inline?: boolean;
  underline?: boolean;
  limitText?: string;
  title?: React.ReactNode;
  cardMenu?: React.ReactNode;
}

export const PageHeader = (props: PageHeaderProps) => {
  const { children, className, inline, underline, limitText, title, cardMenu } =
    props;

  return (
    <>
      <ExtendedPageHeader
        testId="page-header"
        className={className}
        inline={inline}
        underline={underline}
        title={
          <>
            <Typography variant="h4" fontWeight={"bold"}>
              {title !== undefined ? (
                title
              ) : (
                <Skeleton sx={{ width: "10em" }} />
              )}
            </Typography>
            {limitText && (
              <Typography color="textSecondary" variant="h6">
                {limitText}
              </Typography>
            )}
            {cardMenu}
          </>
        }
      >
        <div>{children}</div>
      </ExtendedPageHeader>
    </>
  );
};

PageHeader.displayName = "PageHeader";
export default PageHeader;
