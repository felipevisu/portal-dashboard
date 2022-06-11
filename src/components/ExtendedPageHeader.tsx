import { Divider, styled } from "@mui/material";
import React from "react";

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(3),
}));

const Title = styled("div")(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.text.primary,
}));

interface ExtendedPageHeaderProps {
  children?: React.ReactNode;
  className?: string;
  childrenWrapperClassName?: string;
  inline?: boolean;
  underline?: boolean;
  title?: React.ReactNode;
  testId?: string;
}

const ExtendedPageHeader = (props: ExtendedPageHeaderProps) => {
  const { children, underline, title } = props;

  return (
    <>
      <Header>
        <Title>{title}</Title>
        <div>{children}</div>
      </Header>
      {underline && (
        <div>
          <Divider />
        </div>
      )}
    </>
  );
};
ExtendedPageHeader.displayName = "ExtendedPageHeader";
export default ExtendedPageHeader;
