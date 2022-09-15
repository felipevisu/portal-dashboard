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
  ProviderInput,
  SearchSegmentsQuery,
} from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";
import { RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";

import {
  FormProps,
  ProviderFormInfos,
  ProviderFormStatus,
} from "./ProviderForm";

interface ProviderCreatePageProps {
  onSubmit: (data: ProviderInput) => SubmitPromise;
  errors: ErrorFragment[];
  loading: boolean;
  segments: RelayToFlat<SearchSegmentsQuery["search"]>;
}

export const ProviderCreatePage = ({
  onSubmit,
  errors,
  loading,
  segments: segmentChoiceList,
}: ProviderCreatePageProps) => {
  const navigate = useNavigate();
  const initialData: FormProps = {
    name: "",
    slug: "",
    documentNumber: "",
    segment: "",
    isPublished: false,
    email: "",
    phone: "",
    address: "",
  };
  const segments = getChoices(segmentChoiceList);

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href="/admin/providers">Voltar</Backlink>
            <PageHeader title="Criar novo prestador" />
            <Grid
              container
              spacing={2}
              sx={{ marginBottom: (theme) => theme.spacing(2) }}
            >
              <Grid item xs={8}>
                <ProviderFormInfos
                  errors={errors}
                  onChange={change}
                  data={data}
                  segments={segments}
                />
                <ContactInfosForm<FormProps>
                  data={data}
                  onChange={change}
                  errors={errors}
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
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
