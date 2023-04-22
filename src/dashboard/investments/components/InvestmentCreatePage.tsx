import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import { Form } from "@portal/components/Form";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment, InvestmentInput, ItemFragment } from "@portal/graphql";
import { SubmitPromise } from "@portal/hooks/useForm";

import InvestmentForm, { FormProps } from "./InvestmentForm";
import InvestmentItems from "./InvestmentItems";

interface InvestmentCreatePageProps {
  onSubmit: (data: InvestmentInput) => SubmitPromise;
  errors: ErrorFragment[];
  loading: boolean;
  tollbar: React.ReactNode;
  onDeleteItem: () => void;
  items: ItemFragment[];
}

export const InvestmentCreatePage = ({
  onSubmit,
  errors,
  loading,
  tollbar,
  onDeleteItem,
  items,
}: InvestmentCreatePageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const initialData: FormProps = {
    year: null,
    month: null,
    isPublished: false,
  };

  return (
    <Form initial={initialData} onSubmit={onSubmit}>
      {({ change, submit, data }) => {
        return (
          <>
            <Backlink href="/investments">{t("back")}</Backlink>
            <PageHeader title={t("investment.create")} />
            <InvestmentForm
              errors={errors}
              onChange={change}
              data={data}
              disabled={loading}
            />
            <InvestmentItems
              tollbar={tollbar}
              items={items}
              onDeleteItem={onDeleteItem}
            />
            <Savebar
              onSubmit={submit}
              onCancel={() => navigate("/investments")}
              loading={loading}
            />
          </>
        );
      }}
    </Form>
  );
};

export default InvestmentCreatePage;
