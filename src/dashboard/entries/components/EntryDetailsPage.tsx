import React from "react";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import ContactInfosForm from "@portal/components/ContactInfosForm";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  EntryDetailsQuery,
  ErrorFragment,
  SearchCategoriesQuery,
} from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";
import { Paginator, RelayToFlat } from "@portal/types";
import { getChoices } from "@portal/utils/data";
import { mapEdgesToItems } from "@portal/utils/maps";

import DocumentList from "./DocumentList";
import { EntryFormInfos, EntryFormStatus, FormProps } from "./EntryForm";

interface EntryDetailsPageProps {
  entry: EntryDetailsQuery["entry"];
  onSubmit: (data: FormProps) => SubmitPromise;
  onDelete: () => void;
  errors: ErrorFragment[];
  loading: boolean;
  categories: RelayToFlat<SearchCategoriesQuery["search"]>;
  paginator: Paginator;
}

const content = {
  vehicle: {
    title: "Criar novo veículo",
    link: "vehicles",
  },
  provider: {
    title: "Criar novo prestador",
    link: "providers",
  },
};

const getContent = (pathname: string) =>
  pathname.includes("vehicle") ? content.vehicle : content.provider;

export const EntryDetailsPage = ({
  entry,
  onSubmit,
  onDelete,
  errors,
  loading,
  categories: categoryChoiceList,
  paginator,
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
  const content = getContent(window.location.pathname);

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href={`/admin/${content.link}`}>Voltar</Backlink>
            <PageHeader title={data.name} />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <EntryFormInfos
                  errors={errors}
                  onChange={change}
                  data={data}
                  categories={categories}
                />
                <DocumentList
                  documents={mapEdgesToItems(entry.documents)}
                  paginator={paginator}
                  pageInfo={entry.documents.pageInfo}
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
              onDelete={onDelete}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
