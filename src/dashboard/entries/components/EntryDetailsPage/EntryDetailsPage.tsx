import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import Attributes from "@portal/components/Attributes/Attributes";
import { Backlink } from "@portal/components/Backlink";
import { ChannelsAvailabilityCard } from "@portal/components/ChannelsAvailabilityCard";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ChannelData } from "@portal/dashboard/channels/utils";
import {
  ChannelFragment,
  EntryChannelListingErrorFragment,
  EntryDetailsQuery,
  EntryErrorWithAttributesFragment,
  EntryTypeDetailsFragment,
  PublishableChannelListingInput,
  SearchAttributesQuery,
  SearchAttributeValuesQuery,
  SearchCategoriesQuery,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { SubmitPromise } from "@portal/hooks/useForm";
import useStateFromProps from "@portal/hooks/useStateFromProps";
import { maybe } from "@portal/misc";
import { FetchMoreProps, Paginator, RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";
import { mapEdgesToItems } from "@portal/utils/maps";

import ConsultList from "../Consult/ConsultList";
import DocumentList from "../DocumentList";
import { EntryFormInfos } from "../EntryForm";
import { EntryOrganization } from "../EntryOrganization";

import EntryChannelsListingsDialog from "./EntryChannelsListingsDialog";
import EntryUpdateForm, { EntryUpdateData } from "./form";

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
  channels: ChannelFragment[];
  channelsErrors: EntryChannelListingErrorFragment[];
  entry: EntryDetailsQuery["entry"];
  onSubmit: (data: EntryUpdateData) => SubmitPromise;
  onDelete: () => void;
  errors: EntryErrorWithAttributesFragment[];
  loading: boolean;
  categories: RelayToFlat<SearchCategoriesQuery["search"]>;
  paginator: Paginator;
  fetchCategories: (data: string) => void;
  fetchMoreCategories: FetchMoreProps;
  entryType: EntryTypeDetailsFragment;
  attributeValues: RelayToFlat<
    SearchAttributeValuesQuery["attribute"]["choices"]
  >;
  fetchAttributeValues: (query: string, attributeId: string) => void;
  fetchMoreAttributeValues?: FetchMoreProps;
  onAttributeSelectBlur: () => void;
  onConsultDocument: () => void;
}

export const EntryDetailsPage = ({
  channels,
  channelsErrors,
  entry,
  onSubmit,
  onDelete,
  errors,
  loading,
  categories: categoryChoiceList,
  entryType,
  paginator,
  fetchCategories,
  fetchMoreCategories,
  attributeValues,
  fetchAttributeValues,
  fetchMoreAttributeValues,
  onAttributeSelectBlur,
  onConsultDocument,
}: EntryDetailsPageProps) => {
  const navigate = useNavigate();
  const [channelPickerOpen, setChannelPickerOpen] = React.useState(false);
  const categories = getChoices(categoryChoiceList);
  const { entryTypeId } = useParams();
  const { entryList } = useLinks();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useStateFromProps(
    getChoices(maybe(() => entry.categories, []))
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
      attributes={entryType.entryAttributes}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
    >
      {({ change, submit, data, handlers }) => {
        const listings: ChannelData[] = data.channels.updateChannels.map(
          (listing: PublishableChannelListingInput) => {
            const channel = channels?.find((ac) => ac.id === listing.channelId);
            return {
              id: listing.channelId,
              ...channel,
              ...listing,
            };
          }
        );

        return (
          <>
            <Backlink href={entryList(entryTypeId)}>{t("back")}</Backlink>
            <PageHeader title={entry.name} limitText={entryType.name} />
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label={t("entry.title")} {...a11yProps(0)} />
                <Tab label={t("document.plural")} {...a11yProps(1)} />
                <Tab label={t("consult.plural")} {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
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
                    fetchCategories={fetchCategories}
                    fetchMoreCategories={fetchMoreCategories}
                    onCategoryChange={handlers.selectCategories}
                    disabled={loading}
                    categoriesInputDisplayValue={selectedCategories}
                  />
                  <ChannelsAvailabilityCard
                    errors={channelsErrors}
                    allChannelsCount={channels?.length}
                    disabled={loading}
                    onChange={handlers.changeChannels}
                    openModal={() => setChannelPickerOpen(true)}
                    channels={listings}
                  />
                </Grid>
              </Grid>
              <Savebar
                onSubmit={submit}
                onCancel={() => navigate(entryList(entryTypeId))}
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
            <TabPanel value={value} index={2}>
              <ConsultList
                consults={entry.consult}
                onConsultDocument={onConsultDocument}
                loading={loading}
              />
            </TabPanel>
            <EntryChannelsListingsDialog
              channels={channels}
              data={data}
              onClose={() => setChannelPickerOpen(false)}
              open={channelPickerOpen}
              onConfirm={handlers.updateChannelList}
            />
          </>
        );
      }}
    </EntryUpdateForm>
  );
};

export default EntryDetailsPage;
