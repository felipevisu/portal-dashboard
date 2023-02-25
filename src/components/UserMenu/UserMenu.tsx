import React, { useMemo } from "react";

import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, MenuItem } from "@mui/material";
import { useUser } from "@portal/dashboard/auth";

import { StyledMenu } from "./styles";

export const UserMenu = () => {
  const { user, logout } = useUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const username = useMemo(
    () => (user.firstName ? user.firstName : user.email.split("@")[0]),
    [user]
  );

  return (
    <Box>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color="primary"
        variant="outlined"
        endIcon={<KeyboardArrowDown />}
        onClick={handleClick}
      >
        {username}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </StyledMenu>
    </Box>
  );
};

export default UserMenu;
