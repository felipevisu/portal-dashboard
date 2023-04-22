import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  AttributeDetailsQueryResult,
  AttributeInputTypeEnum,
  AttributeUpdateInput,
  ErrorFragment,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { SubmitPromise } from "@portal/hooks/useForm";
import { mapEdgesToItems } from "@portal/utils/maps";

import { AttributeInfos } from "./AttributeInfos";
import AttributeOrganization from "./AttributeOrganization";
import AttributeValues from "./AttributeValues";

interface AttributeDetailsPageProps {
  attribute: AttributeDetailsQueryResult["data"]["attribute"];
  onSubmit: (data: AttributeUpdateInput) => SubmitPromise;
  errors: ErrorFragment[];
  loading: boolean;
  onDelete: () => void;
  onCreateValue: () => void;
  onUpdateValue: () => void;
  onDeleteValue: () => void;
  onNext: (val: string) => void;
  onPrev: (val: string) => void;
}

export const AttributeDetailsPage = ({
  attribute,
  onSubmit,
  onDelete,
  errors,
  loading,
  onCreateValue,
  onUpdateValue,
  onDeleteValue,
  onNext,
  onPrev,
}: AttributeDetailsPageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { attributeList } = useLinks();
  const initialData = {
    name: attribute.name,
    slug: attribute.slug,
    valueRequired: attribute.valueRequired,
    visibleInWebsite: attribute.visibleInWebsite,
  };

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href={attributeList()}>{t("back")}</Backlink>
            <PageHeader title={`Atributo: ${attribute.name}`} />
            <Grid container spacing={{ xs: 0, md: 2 }}>
              <Grid item xs={12} md={8}>
                <AttributeInfos
                  errors={errors}
                  onChange={change}
                  data={data}
                  instance={attribute}
                />
                {[
                  AttributeInputTypeEnum.DROPDOWN,
                  AttributeInputTypeEnum.MULTISELECT,
                ].some((type) => type === attribute.inputType) && (
                  <AttributeValues
                    onCreateValue={onCreateValue}
                    onUpdateValue={onUpdateValue}
                    onDeleteValue={onDeleteValue}
                    values={mapEdgesToItems(attribute.choices)}
                    onNext={onNext}
                    onPrev={onPrev}
                    pageInfo={attribute.choices.pageInfo}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <AttributeOrganization
                  errors={errors}
                  onChange={change}
                  data={data}
                  instance={attribute}
                />
              </Grid>
            </Grid>
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate(attributeList())}
              onDelete={onDelete}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};

export default AttributeDetailsPage;
