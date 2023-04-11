import React, { useMemo } from "react";

import { KeyboardArrowDown } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box, Button, MenuItem, Typography } from "@mui/material";
import { useUser } from "@portal/dashboard/auth";
import useThemeToggle from "@portal/hooks/useThemeToggle";

import { StyledMenu } from "./styles";

export const UserMenu = () => {
  const { user, logout } = useUser();
  const { toggleColorMode, mode } = useThemeToggle();
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
        <MenuItem onClick={toggleColorMode}>
          {mode === "dark" ? (
            <>
              <Brightness7Icon sx={{ marginRight: 1 }} />
              <Typography>Modo claro</Typography>
            </>
          ) : (
            <>
              <Brightness4Icon sx={{ marginRight: 1 }} />
              <Typography>Modo escuro</Typography>
            </>
          )}
        </MenuItem>
      </StyledMenu>
    </Box>
  );
};

export default UserMenu;
