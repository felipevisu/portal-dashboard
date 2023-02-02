import React from "react";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import ContactInfosForm from "@portal/components/ContactInfosForm";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  EntryInput,
  ErrorFragment,
  SearchCategoriesQuery,
} from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";
import { RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";

import { useEntryType } from "../hooks";

import { EntryFormInfos, EntryFormStatus, FormProps } from "./EntryForm";

interface EntryCreatePageProps {
  onSubmit: (data: EntryInput) => SubmitPromise;
  errors: ErrorFragment[];
  loading: boolean;
  categories: RelayToFlat<SearchCategoriesQuery["search"]>;
}

export const EntryCreatePage = ({
  onSubmit,
  errors,
  loading,
  categories: categoryChoiceList,
}: EntryCreatePageProps) => {
  const navigate = useNavigate();
  const initialData: FormProps = {
    name: "",
    slug: "",
    documentNumber: "",
    category: "",
    isPublished: false,
    email: "",
    phone: "",
    address: "",
  };

  const categories = getChoices(categoryChoiceList);
  const content = useEntryType();

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href={`/admin/${content.link}`}>Voltar</Backlink>
            <PageHeader title={content.header} />
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
                <EntryFormStatus
                  errors={errors}
                  onChange={change}
                  data={data}
                  categories={categories}
                />
              </Grid>
            </Grid>
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate("/admin/entries")}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
