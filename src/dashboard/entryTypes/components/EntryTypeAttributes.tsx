import { Delete } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button } from "@portal/components/Button";
import TableCellHeader from "@portal/components/TableCell";
import { AttributeFragment } from "@portal/graphql";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

interface EntryTypeAttributesProps {
  attributes: AttributeFragment[];
  onAssignAttribute: () => void;
  onUnassignAttribute: () => void;
}

export const EntryTypeAttributes = ({
  attributes,
  onAssignAttribute,
  onUnassignAttribute,
}: EntryTypeAttributesProps) => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();

  const handleUnassignAttribute = (id: string) => {
    onUnassignAttribute();
    setSearchParams({ id });
  };

  return (
    <Card>
      <CardHeader
        title={t("entryType.attributes.title")}
        action={
          <Button onClick={onAssignAttribute}>
            {t("entryType.attributes.add")}
          </Button>
        }
      />
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCellHeader>{t("name")}</TableCellHeader>
              <TableCellHeader>{t("slug")}</TableCellHeader>
              <TableCellHeader align="right">{t("delete")}</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              ".MuiTableRow-root:last-of-type .MuiTableCell-root": {
                border: "none",
              },
            }}
          >
            {attributes.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ paddingLeft: 3 }}>{item.name}</TableCell>
                <TableCell>{item.slug}</TableCell>
                <TableCell align="right" sx={{ paddingRight: 3 }}>
                  <IconButton onClick={() => handleUnassignAttribute(item.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default EntryTypeAttributes;
