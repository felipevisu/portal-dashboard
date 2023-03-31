import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import JSONPretty from "react-json-pretty";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  Typography,
} from "@mui/material";
import { Button } from "@portal/components/Button";
import { ConsultFragment } from "@portal/graphql";
import { formatDateTime } from "@portal/utils/date";

interface ConsultListProps {
  consults: ConsultFragment[];
  onConsultDocument: () => void;
}

interface ConsultItemProps {
  consult: ConsultFragment;
}

export const ConsultItem = ({ consult }: ConsultItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ paddingBottom: 2 }}>
      <CardHeader
        title={formatDateTime(consult.created)}
        action={
          <Button variant="outlined" onClick={handleExpand}>
            {expanded ? "Fechar" : "Abrir"}
          </Button>
        }
      />
      <Collapse in={expanded}>
        <CardContent>
          <JSONPretty id="json-pretty" data={consult.response}></JSONPretty>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export const ConsultList = ({
  consults,
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
            <Button onClick={onConsultDocument} variant="contained" fullWidth>
              {t("consult.action")}
            </Button>
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
