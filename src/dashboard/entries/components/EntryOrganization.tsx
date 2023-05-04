import React from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { MultiAutocompleteChoiceType } from "@portal/components/Attributes/utils";
import { MultiAutocompleteSelectField } from "@portal/components/MultiAutocompleteSelectField";
import { EntryErrorWithAttributesFragment } from "@portal/graphql";
import { ChangeEvent, FetchMoreProps } from "@portal/types";
import { getFormErrors } from "@portal/utils/errors";

interface EntryOrganizationProps {
  errors: EntryErrorWithAttributesFragment[];
  data: {
    categories: string[];
  };
  categories: MultiAutocompleteChoiceType[];
  categoriesInputDisplayValue: MultiAutocompleteChoiceType[];
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
  categoriesInputDisplayValue,
  onCategoryChange,
  fetchCategories,
  fetchMoreCategories,
  disabled,
}: EntryOrganizationProps) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(["categories"], errors);

  return (
    <Card>
      <CardHeader title={t("visibility")} />
      <CardContent>
        <FormControl fullWidth>
          <MultiAutocompleteSelectField
            displayValues={categoriesInputDisplayValue}
            error={!!formErrors.categories}
            label={t("category.plural")}
            choices={disabled ? [] : categories}
            name="categories"
            value={data.categories}
            onChange={onCategoryChange}
            fetchChoices={fetchCategories}
            {...fetchMoreCategories}
          />
          <FormHelperText error={formErrors.categories && true}>
            {formErrors.categories?.message}
          </FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
  );
};
