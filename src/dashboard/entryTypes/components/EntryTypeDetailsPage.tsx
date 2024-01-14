import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  EntryTypeDetailsFragment,
  EntryTypeFragment,
  EntryTypeInput,
  ErrorFragment,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { SubmitPromise } from "@portal/hooks/useForm";

import EntryTypeForm, { FormProps } from "./EntryTypeForm";
import EntryTypeAttributes from "./EntryTypeAttributes";

interface EntryTypeDetailsPageProps {
  entryType: EntryTypeDetailsFragment;
  onSubmit: (data: EntryTypeInput) => SubmitPromise;
  onDelete: () => void;
  errors: ErrorFragment[];
  loading: boolean;
  onAssignAttribute: () => void;
  onUnassignAttribute: () => void;
}

export const EntryTypeDetailsPage = ({
  entryType,
  onSubmit,
  onDelete,
  errors,
  loading,
  onAssignAttribute,
  onUnassignAttribute,
}: EntryTypeDetailsPageProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { entryTypeList } = useLinks();

  const initialData: FormProps = {
    name: entryType.name,
    slug: entryType.slug,
  };

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, data, submit }) => {
        return (
          <>
            <Backlink href={entryTypeList()}>{t("back")}</Backlink>
            <PageHeader title={`${t("entryType.title")}: ${entryType?.name}`} />
            <EntryTypeForm
              errors={errors}
              onChange={change}
              data={data}
              disabled={loading}
            />
            <EntryTypeAttributes
              attributes={entryType.entryAttributes}
              onAssignAttribute={onAssignAttribute}
              onUnassignAttribute={onUnassignAttribute}
            />
            <Savebar
              onSubmit={submit}
              onDelete={() => onDelete()}
              onCancel={() => navigate(entryTypeList())}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};
