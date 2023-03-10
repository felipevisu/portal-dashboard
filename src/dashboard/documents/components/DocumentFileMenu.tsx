import * as React from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { DocumentFileFragment } from "@portal/graphql";

interface FileMenuProps {
  documentFile: DocumentFileFragment;
  onFileAction: (id: string, actionName: string) => Promise<void>;
}

export default function FileMenu({
  documentFile,
  onFileAction,
}: FileMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAction = (actionName: string) => {
    onFileAction(documentFile.id, actionName);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {documentFile.status === "APPROVED" && (
          <MenuItem onClick={() => handleAction("RESTORE")}>Restaurar</MenuItem>
        )}
        {documentFile.status === "WAITING" && (
          <>
            <MenuItem onClick={() => handleAction("APPROVE")}>Aprovar</MenuItem>
            <MenuItem onClick={() => handleAction("REFUSE")}>Recusar</MenuItem>
          </>
        )}
        <MenuItem onClick={() => handleAction("DELETE")}>Excluir</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
