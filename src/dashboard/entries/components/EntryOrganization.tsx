import React from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@portal/components/Button";
import { EntryErrorWithAttributesFragment } from "@portal/graphql";
import { ChangeEvent, FetchMoreProps } from "@portal/types";
import { SingleAutocompleteChoiceType } from "@portal/utils/data";
import { getFormErrors } from "@portal/utils/errors";

interface EntryOrganizationProps {
  errors: EntryErrorWithAttributesFragment[];
  data: {
    category: string;
  };
  categories: SingleAutocompleteChoiceType[];
  onChange: (e: ChangeEvent) => void;
  onCategoryChange: (event: ChangeEvent) => void;
  fetchCategories: (query: string) => void;
  fetchMoreCategories: FetchMoreProps;
  disabled: boolean;
}

export const EntryOrganization = ({
  errors,
  data,
  categories,
  onChange,
  onCategoryChange,
  fetchCategories,
  fetchMoreCategories,
  disabled,
}: EntryOrganizationProps) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(["category"], errors);

  return (
    <Card>
      <CardHeader title={t("visibility")} />
      <CardContent>
        <FormControl fullWidth>
          <InputLabel error={formErrors.category && true}>
            {t("category.title")}
          </InputLabel>
          <Select
            fullWidth
            name="category"
            label={t("category.title")}
            value={data.category}
            onChange={onCategoryChange}
            error={formErrors.category && true}
            disabled={disabled}
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
            {fetchMoreCategories.hasMore && (
              <Box paddingX={2} paddingY={1}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={fetchMoreCategories.onFetchMore}
                >
                  Carregar mais
                </Button>
              </Box>
            )}
          </Select>
          <FormHelperText error={formErrors.category && true}>
            {formErrors.category?.message}
          </FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
  );
};
