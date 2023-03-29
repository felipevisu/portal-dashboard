import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import Attributes from "@portal/components/Attributes/Attributes";
import { Backlink } from "@portal/components/Backlink";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  EntryDetailsQuery,
  EntryErrorWithAttributesFragment,
  SearchAttributeValuesQuery,
  SearchCategoriesQuery,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { SubmitPromise } from "@portal/hooks/useForm";
import useStateFromProps from "@portal/hooks/useStateFromProps";
import { FetchMoreProps, Paginator, RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";
import { mapEdgesToItems } from "@portal/utils/maps";

import DocumentList from "../DocumentList";
import { EntryFormInfos, FormProps } from "../EntryForm";
import { EntryOrganization } from "../EntryOrganization";

import EntryUpdateForm from "./form";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface EntryDetailsPageProps {
  entry: EntryDetailsQuery["entry"];
  onSubmit: (data: FormProps) => SubmitPromise;
  onDelete: () => void;
  errors: EntryErrorWithAttributesFragment[];
  loading: boolean;
  categories: RelayToFlat<SearchCategoriesQuery["search"]>;
  paginator: Paginator;
  fetchCategories: (data: string) => void;
  fetchMoreCategories: FetchMoreProps;
  attributeValues: RelayToFlat<
    SearchAttributeValuesQuery["attribute"]["choices"]
  >;
  fetchAttributeValues: (query: string, attributeId: string) => void;
  fetchMoreAttributeValues?: FetchMoreProps;
  onAttributeSelectBlur: () => void;
}

export const EntryDetailsPage = ({
  entry,
  onSubmit,
  onDelete,
  errors,
  loading,
  categories: categoryChoiceList,
  paginator,
  fetchCategories,
  fetchMoreCategories,
  attributeValues,
  fetchAttributeValues,
  fetchMoreAttributeValues,
  onAttributeSelectBlur,
}: EntryDetailsPageProps) => {
  const navigate = useNavigate();

  const categories = getChoices(categoryChoiceList);
  const { entry: type } = useParams();
  const { entryList } = useLinks();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useStateFromProps(
    entry.category.id
  );

  const [value, setValue] = React.useState(
    parseInt(searchParams.get("tab")) || 0
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setSearchParams({ tab: newValue.toString() });
  };

  return (
    <EntryUpdateForm
      entry={entry}
      onSubmit={onSubmit}
      loading={loading}
      categories={categories}
      setSelectedCategory={setSelectedCategory}
    >
      {({ change, submit, data, handlers }) => {
        return (
          <>
            <Backlink href={entryList(type)}>{t("back")}</Backlink>
            <PageHeader title={data.name} />
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label={
                    type === "vehicles"
                      ? t("vehicles.title")
                      : t("providers.title")
                  }
                  {...a11yProps(0)}
                />
                <Tab label="Documentos" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <EntryFormInfos
                    errors={errors}
                    onChange={change}
                    data={data}
                    categories={categories}
                  />
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
                </Grid>
                <Grid item xs={4}>
                  <EntryOrganization
                    errors={errors}
                    onChange={change}
                    data={data}
                    categories={categories}
                    fetchCategories={fetchCategories}
                    fetchMoreCategories={fetchMoreCategories}
                    onCategoryChange={() => undefined}
                  />
                </Grid>
              </Grid>
              <Savebar
                onSubmit={submit}
                onCancel={() => navigate(entryList(type))}
                onDelete={onDelete}
                loading={loading}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <DocumentList
                documents={mapEdgesToItems(entry.documents)}
                paginator={paginator}
                pageInfo={entry.documents.pageInfo}
              />
            </TabPanel>
          </>
        );
      }}
    </EntryUpdateForm>
  );
};

export default EntryDetailsPage;
