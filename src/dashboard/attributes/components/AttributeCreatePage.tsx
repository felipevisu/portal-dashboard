import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  AttributeCreateInput,
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
  const initialData = {
    name: "",
    slug: "",
    type: AttributeTypeEnum.VEHICLE_AND_PROVIDER,
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
            <Grid container spacing={2}>
              <Grid item xs={8}>
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
              <Grid item xs={4}>
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
