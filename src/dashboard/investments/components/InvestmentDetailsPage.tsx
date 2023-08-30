import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";
import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  ErrorFragment,
  InvestmentDetailsFragment,
  InvestmentInput,
} from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";
import { toMonthName } from "@portal/utils/date";

import InvestmentForm, { FormProps } from "./InvestmentForm";
import InvestmentItems from "./InvestmentItems";
import InvestmentOrganization from "./InvestmentOrganization";
import { useLinks } from "@portal/hooks";

interface InvestmentDetailsPageProps {
  investment: InvestmentDetailsFragment;
  onSubmit: (data: InvestmentInput) => SubmitPromise;
  onDelete: () => void;
  errors: ErrorFragment[];
  loading: boolean;
  tollbar: React.ReactNode;
  onDeleteItem: () => void;
}

export const InvestmentDetailsPage = ({
  investment,
  onSubmit,
  onDelete,
  errors,
  loading,
  tollbar,
  onDeleteItem,
}: InvestmentDetailsPageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { investmentList } = useLinks();

  const initialData: FormProps = {
    year: investment.year,
    month: investment.month,
    isPublished: investment.isPublished,
    channel: investment.channel?.id,
  };

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href={investmentList()}>{t("back")}</Backlink>
            <PageHeader
              title={`${toMonthName(investment.month)} de ${investment.year}`}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} lg={8}>
                <InvestmentForm
                  errors={errors}
                  onChange={change}
                  data={data}
                  disabled={loading}
                />
                <InvestmentItems
                  tollbar={tollbar}
                  items={investment.items}
                  onDeleteItem={onDeleteItem}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <InvestmentOrganization
                  errors={errors}
                  onChange={change}
                  data={data}
                  disabled={loading}
                />
              </Grid>
            </Grid>
            <Savebar
              onDelete={onDelete}
              onSubmit={submit}
              onCancel={() => navigate(investmentList())}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};

export default InvestmentDetailsPage;
