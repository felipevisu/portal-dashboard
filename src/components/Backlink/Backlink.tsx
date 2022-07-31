import React from "react";
import { Link } from "react-router-dom";

import { ArrowBack } from "@mui/icons-material";
import { Portal } from "@mui/material";
import { isExternalURL } from "@portal/utils/urls";

import { LayoutButton, LayoutButtonProps } from "../LayoutButton";

import { useBacklink } from "./context";

export type BacklinkProps<T extends React.ElementType> =
  LayoutButtonProps<T> & {
    children: React.ReactNode;
    disabled?: boolean;
  };

export const BacklinkComponent = <T extends React.ElementType>({
  children,
  disabled,
  onClick,
  ...props
}: BacklinkProps<T>) => {
  const anchor = useBacklink();

  if (!anchor.current) {
    return null;
  }

  return (
    <Portal container={anchor.current}>
      <LayoutButton disabled={disabled} onClick={onClick} {...props}>
        <ArrowBack />
        {children}
      </LayoutButton>
    </Portal>
  );
};

export const Backlink = ({
  href,
  ...props
}: BacklinkProps<"a"> & BacklinkProps<"button">) => {
  if (href && !isExternalURL(href)) {
    return (
      <BacklinkComponent<typeof Link> component={Link} to={href} {...props} />
    );
  }

  if (href) {
    return <BacklinkComponent<"a"> href={href} {...props} />;
  }

  return <BacklinkComponent<"button"> {...props} />;
};
