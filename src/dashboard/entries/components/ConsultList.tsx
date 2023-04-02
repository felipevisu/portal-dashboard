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
  Typography,
} from "@mui/material";
import { Button } from "@portal/components/Button";
import { ConsultFragment } from "@portal/graphql";
import { formatDateTime } from "@portal/utils/date";

interface ConsultListProps {
  consults: ConsultFragment[];
  loading: boolean;
  onConsultDocument: () => void;
}

interface ConsultItemProps {
  consult: ConsultFragment;
}

export const ConsultItem = ({ consult }: ConsultItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  const handleExpand = () => {
    setExpanded(!expanded);
  };

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
            <Button variant="outlined" onClick={handleExpand}>
              {expanded ? "Fechar" : "Abrir"}
            </Button>
          </Box>
        </Box>
        <Collapse in={expanded}>
          <Box sx={{ paddingTop: 2 }}>
            <Divider sx={{ marginBottom: 2 }} />
            <JSONPretty id="json-pretty" data={consult.response}></JSONPretty>
          </Box>
        </Collapse>
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
        {consults.map((consult) => (
          <ConsultItem key={consult.id} consult={consult} />
        ))}
      </Grid>
    </Grid>
  );
};

export default ConsultList;
