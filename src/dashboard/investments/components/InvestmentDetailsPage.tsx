import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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

  const initialData: FormProps = {
    year: investment.year,
    month: investment.month,
    isPublished: investment.isPublished,
  };

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href="/admin/investments">{t("back")}</Backlink>
            <PageHeader
              title={`${toMonthName(investment.month)} de ${investment.year}`}
            />
            <InvestmentForm errors={errors} onChange={change} data={data} />
            <InvestmentItems
              tollbar={tollbar}
              onDeleteItem={onDeleteItem}
              items={investment.items}
            />
            <Savebar
              onDelete={onDelete}
              onSubmit={submit}
              onCancel={() => navigate("/admin/investments")}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};

export default InvestmentDetailsPage;
