import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import JSONPretty from "react-json-pretty";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Button } from "@portal/components/Button";
import { ConsultFragment } from "@portal/graphql";
import { formatDateTime } from "@portal/utils/date";

import FormatedConsult from "./FormatedConsult";

interface ConsultListProps {
  consults: ConsultFragment[];
  loading: boolean;
  onConsultDocument: () => void;
}

interface ConsultItemProps {
  consult: ConsultFragment;
}

export const ConsultItem = ({ consult }: ConsultItemProps) => {
  const [type, setType] = useState<"FORMATED" | "JSON">("FORMATED");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleChange = (value: "FORMATED" | "JSON") => {
    setType(value);
    setAnchorEl(null);
  };

  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", paddingTop: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography fontWeight={700}>{t("consult.item.title")}</Typography>
            <Typography>
              {t("consult.item.date")}: {formatDateTime(consult.created)}
            </Typography>
          </Box>
          <Box sx={{ alignSelf: "center" }}>
            <Button
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="outlined"
            >
              {type === "FORMATED" ? "FORMATADO" : "JSON"}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={() => handleChange("FORMATED")}>
                FORMATADO
              </MenuItem>
              <MenuItem onClick={() => handleChange("JSON")}>JSON</MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box sx={{ paddingTop: 2 }}>
          <Divider sx={{ marginBottom: 2 }} />
          {type === "FORMATED" && (
            <FormatedConsult consult={JSON.parse(consult.response)} />
          )}
          {type === "JSON" && (
            <JSONPretty id="json-pretty" data={consult.response}></JSONPretty>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export const ConsultList = ({
  consults,
  loading,
  onConsultDocument,
}: ConsultListProps) => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Card>
          <CardHeader title={t("consult.new")} />
          <CardContent>
            <Typography>{t("consult.info")}</Typography>
          </CardContent>
          <CardActions>
            <LoadingButton
              loading={loading}
              onClick={onConsultDocument}
              variant="contained"
              fullWidth
            >
              {t("consult.action")}
            </LoadingButton>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <ConsultItem consult={consults[0]} />
      </Grid>
    </Grid>
  );
};

export default ConsultList;
