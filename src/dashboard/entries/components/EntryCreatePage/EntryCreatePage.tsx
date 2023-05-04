import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { Grid } from "@mui/material";
import Attributes from "@portal/components/Attributes/Attributes";
import { Backlink } from "@portal/components/Backlink";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  EntryErrorWithAttributesFragment,
  EntryInput,
  SearchAttributesQuery,
  SearchAttributeValuesQuery,
  SearchCategoriesQuery,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { SubmitPromise } from "@portal/hooks/useForm";
import useStateFromProps from "@portal/hooks/useStateFromProps";
import { FetchMoreProps, RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";

import { EntryFormInfos } from "../EntryForm";
import { EntryOrganization } from "../EntryOrganization";

import Channels from "./Channels";
import EntryCreateForm from "./form";

interface EntryCreatePageProps {
  onSubmit: (data: EntryInput) => SubmitPromise;
  errors: EntryErrorWithAttributesFragment[];
  loading: boolean;
  categories: RelayToFlat<SearchCategoriesQuery["search"]>;
  fetchCategories: (data: string) => void;
  fetchMoreCategories: FetchMoreProps;
  attributes: RelayToFlat<SearchAttributesQuery["search"]>;
  attributeValues: RelayToFlat<
    SearchAttributeValuesQuery["attribute"]["choices"]
  >;
  fetchAttributeValues: (query: string, attributeId: string) => void;
  fetchMoreAttributeValues?: FetchMoreProps;
  onAttributeSelectBlur: () => void;
}

export const EntryCreatePage = ({
  onSubmit,
  errors,
  loading,
  categories: categoryChoiceList,
  fetchCategories,
  fetchMoreCategories,
  attributes,
  attributeValues,
  fetchAttributeValues,
  fetchMoreAttributeValues,
  onAttributeSelectBlur,
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
            <Grid container spacing={{ xs: 0, md: 2 }}>
              <Grid item xs={12} md={8}>
                <EntryFormInfos
                  errors={errors}
                  onChange={change}
                  data={data}
                  categories={categories}
                  disabled={loading}
                />
                {data.attributes.length && (
                  <Attributes
                    attributes={data.attributes}
                    attributeValues={attributeValues}
                    loading={loading}
                    errors={errors}
                    onChange={handlers.selectAttribute}
                    onMultiChange={handlers.selectAttributeMultiple}
                    fetchAttributeValues={fetchAttributeValues}
                    fetchMoreAttributeValues={fetchMoreAttributeValues}
                    onAttributeSelectBlur={onAttributeSelectBlur}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <EntryOrganization
                  errors={errors}
                  onChange={change}
                  data={data}
                  categories={categories}
                  onCategoryChange={handlers.selectCategory}
                  fetchCategories={fetchCategories}
                  fetchMoreCategories={fetchMoreCategories}
                  disabled={loading}
                />
                <Channels />
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
