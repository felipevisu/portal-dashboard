import React from "react";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import ContactInfosForm from "@portal/components/ContactInfosForm";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  ErrorFragment,
  ProviderDetailsQuery,
  ProviderInput,
  SearchSegmentsQuery,
} from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";
import { Paginator, RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";
import { mapEdgesToItems } from "@portal/utils/maps";

import DocumentList from "./DocumentList";
import {
  FormProps,
  ProviderFormInfos,
  ProviderFormStatus,
} from "./ProviderForm";

interface ProviderDetailsPageProps {
  provider: ProviderDetailsQuery["provider"];
  onSubmit: (data: ProviderInput) => SubmitPromise;
  onDelete: () => void;
  errors: ErrorFragment[];
  loading: boolean;
  segments: RelayToFlat<SearchSegmentsQuery["search"]>;
  paginator: Paginator;
}

export const ProviderDetailsPage = ({
  provider,
  onSubmit,
  onDelete,
  errors,
  loading,
  segments: segmentChoiceList,
  paginator,
}: ProviderDetailsPageProps) => {
  const navigate = useNavigate();
  const initialData: FormProps = {
    name: provider.name,
    slug: provider.slug,
    documentNumber: provider.documentNumber,
    segment: provider.segment.id,
    isPublished: provider.isPublished,
    email: provider.email,
    phone: provider.phone,
    address: provider.address,
  };

  const segments = getChoices(segmentChoiceList);

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href="/admin/providers">Voltar</Backlink>
            <PageHeader title={provider.name} />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <ProviderFormInfos
                  errors={errors}
                  onChange={change}
                  data={data}
                  segments={segments}
                />
                <DocumentList
                  documents={mapEdgesToItems(provider.documents)}
                  paginator={paginator}
                  pageInfo={provider.documents.pageInfo}
                />
                <ContactInfosForm<FormProps>
                  errors={errors}
                  onChange={change}
                  data={data}
                />
              </Grid>
              <Grid item xs={4}>
                <ProviderFormStatus
                  errors={errors}
                  onChange={change}
                  data={data}
                  segments={segments}
                />
              </Grid>
            </Grid>
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate("/admin/providers")}
              onDelete={onDelete}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
