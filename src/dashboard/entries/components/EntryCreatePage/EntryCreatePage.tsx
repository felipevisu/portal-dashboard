import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { Grid } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import ContactInfosForm from "@portal/components/ContactInfosForm";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  EntryInput,
  ErrorFragment,
  SearchAttributesQuery,
  SearchCategoriesQuery,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { SubmitPromise } from "@portal/hooks/useForm";
import useStateFromProps from "@portal/hooks/useStateFromProps";
import { FetchMoreProps, RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";

import { mapType } from "../../views/utils";
import { EntryFormInfos, FormProps } from "../EntryForm";
import { EntryOrganization } from "../EntryOrganization";

import EntryCreateForm, { EntryCreateFormData } from "./form";

interface EntryCreatePageProps {
  onSubmit: (data: EntryInput) => SubmitPromise;
  errors: ErrorFragment[];
  loading: boolean;
  categories: RelayToFlat<SearchCategoriesQuery["search"]>;
  fetchCategories: (data: string) => void;
  fetchMoreCategories: FetchMoreProps;
  attributes: RelayToFlat<SearchAttributesQuery["search"]>;
  fetchAttributeValues: (query: string, attributeId: string) => void;
  fetchMoreAttributeValues?: FetchMoreProps;
}

export const EntryCreatePage = ({
  onSubmit,
  errors,
  loading,
  categories: categoryChoiceList,
  fetchCategories,
  fetchMoreCategories,
  attributes,
  fetchAttributeValues,
  fetchMoreAttributeValues,
}: EntryCreatePageProps) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useStateFromProps("");
  const categories = getChoices(categoryChoiceList);
  const { entry: type } = useParams();
  const { entryList } = useLinks();
  const { t } = useTranslation();

  return (
    <EntryCreateForm
      onSubmit={onSubmit}
      loading={loading}
      categories={categories}
      attributes={attributes}
      setSelectedCategory={setSelectedCategory}
    >
      {({ change, submit, data, handlers }) => {
        return (
          <>
            <Backlink href={entryList(type)}>{t("back")}</Backlink>
            <PageHeader title={t(`${type}.create`)} />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <EntryFormInfos
                  errors={errors}
                  onChange={change}
                  data={data}
                  categories={categories}
                />
                <ContactInfosForm<FormProps>
                  errors={errors}
                  onChange={change}
                  data={data}
                />
              </Grid>
              <Grid item xs={4}>
                <EntryOrganization
                  errors={errors}
                  onChange={change}
                  data={data}
                  categories={categories}
                  onCategoryChange={handlers.selectCategory}
                  fetchCategories={fetchCategories}
                  fetchMoreCategories={fetchMoreCategories}
                />
              </Grid>
            </Grid>
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate(entryList(type))}
              loading={loading}
            />
          </>
        );
      }}
    </EntryCreateForm>
  );
};

export default EntryCreatePage;
