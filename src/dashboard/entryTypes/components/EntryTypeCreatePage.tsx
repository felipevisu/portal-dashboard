import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { EntryTypeInput, ErrorFragment } from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { SubmitPromise } from "@portal/hooks/useForm";

import EntryTypeForm, { FormProps } from "./EntryTypeForm";

interface EntryTypeCreatePageProps {
  onSubmit: (data: EntryTypeInput) => SubmitPromise;
  errors: ErrorFragment[];
  loading: boolean;
}

export const EntryTypeCreatePage = ({
  onSubmit,
  errors,
  loading,
}: EntryTypeCreatePageProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { entryTypeList } = useLinks();

  const initialData: FormProps = {
    name: "",
    slug: "",
  };

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href={entryTypeList()}>{t("back")}</Backlink>
            <PageHeader title={t("entryType.create")} />
            <EntryTypeForm
              errors={errors}
              onChange={change}
              data={data}
              disabled={loading}
            />
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate(entryTypeList())}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
