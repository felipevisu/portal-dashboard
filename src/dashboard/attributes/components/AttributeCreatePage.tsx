import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  AttributeCreateInput,
  AttributeEntityTypeEnum,
  AttributeInputTypeEnum,
  AttributeTypeEnum,
  AttributeValueCreateInput,
  ErrorFragment,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { SubmitPromise } from "@portal/hooks/useForm";

import { AttributeInfos } from "./AttributeInfos";
import AttributeOrganization from "./AttributeOrganization";
import AttributeValues from "./AttributeValues";

interface Value extends AttributeValueCreateInput {
  id: string;
}

interface AttributeCreatePageProps {
  onSubmit: (data: AttributeCreateInput) => SubmitPromise;
  errors: ErrorFragment[];
  loading: boolean;
  values: Value[];
  onCreateValue: () => void;
  onDeleteValue: () => void;
}

export interface AttributePageFormData {
  name: string;
  slug: string;
  type: AttributeTypeEnum;
  inputType: AttributeInputTypeEnum;
  entityType: AttributeEntityTypeEnum | null;
  valueRequired: boolean;
  visibleInWebsite: boolean;
}

export const AttributeCreatePage = ({
  onSubmit,
  errors,
  loading,
  values,
  onCreateValue,
  onDeleteValue,
}: AttributeCreatePageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { attributeList } = useLinks();

  const initialData: AttributePageFormData = {
    name: "",
    slug: "",
    type: AttributeTypeEnum.VEHICLE_AND_PROVIDER,
    entityType: null,
    inputType: AttributeInputTypeEnum.DROPDOWN,
    valueRequired: false,
    visibleInWebsite: false,
  };

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href={attributeList()}>{t("back")}</Backlink>
            <PageHeader title={t(`attribute.create`)} />
            <Grid container spacing={{ xs: 0, md: 2 }}>
              <Grid item xs={12} md={8}>
                <AttributeInfos errors={errors} onChange={change} data={data} />
                {[
                  AttributeInputTypeEnum.DROPDOWN,
                  AttributeInputTypeEnum.MULTISELECT,
                ].some((type) => type === data.inputType) && (
                  <AttributeValues
                    onCreateValue={onCreateValue}
                    onDeleteValue={onDeleteValue}
                    values={values}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <AttributeOrganization
                  errors={errors}
                  onChange={change}
                  data={data}
                />
              </Grid>
            </Grid>
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate(attributeList())}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};

export default AttributeCreatePage;
