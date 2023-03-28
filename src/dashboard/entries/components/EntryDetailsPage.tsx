import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import ContactInfosForm from "@portal/components/ContactInfosForm";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  EntryDetailsQuery,
  EntryErrorWithAttributesFragment,
  ErrorFragment,
  SearchCategoriesQuery,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { SubmitPromise } from "@portal/hooks/useForm";
import { FetchMoreProps, Paginator, RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";
import { mapEdgesToItems } from "@portal/utils/maps";

import DocumentList from "./DocumentList";
import { EntryFormInfos, FormProps } from "./EntryForm";
import { EntryOrganization } from "./EntryOrganization";

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
}: EntryDetailsPageProps) => {
  const navigate = useNavigate();
  const initialData: FormProps = {
    name: entry.name,
    slug: entry.slug,
    documentNumber: entry.documentNumber,
    category: entry.category.id,
    isPublished: entry.isPublished,
    email: entry.email,
    phone: entry.phone,
    address: entry.address,
  };

  const categories = getChoices(categoryChoiceList);
  const { entry: type } = useParams();
  const { entryList } = useLinks();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [value, setValue] = React.useState(
    parseInt(searchParams.get("tab")) || 0
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setSearchParams({ tab: newValue.toString() });
  };

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
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
    </Form>
  );
};
