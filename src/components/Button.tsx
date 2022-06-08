import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Button as BaseButton, ButtonTypeMap } from "@mui/material";
import { isExternalURL } from "@portal/utils/urls";
import React from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const _Button: React.FC<any> = React.forwardRef(({ href, ...props }, ref) => {
  if (href && !isExternalURL(href)) {
    return <BaseButton {...props} to={href} component={Link} ref={ref} />;
  }

  return <BaseButton href={href} {...props} ref={ref} />;
});
_Button.displayName = "Button";

export const Button = _Button as OverridableComponent<ButtonTypeMap>;
