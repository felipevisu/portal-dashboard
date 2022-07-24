import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  ErrorFragment,
  InvestmentDetailsFragment,
  InvestmentInput,
} from "@portal/graphql";
import { toMonthName } from "@portal/utils/date";

import InvestmentForm, { FormProps } from "./InvestmentForm";
import InvestmentItems from "./InvestmentItems";

interface InvestmentDetailsPageProps {
  investment: InvestmentDetailsFragment;
  onSubmit: (data: InvestmentInput) => Promise<void>;
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
  const navigate = useNavigate();
  const [data, setData] = useState<FormProps>({
    year: investment.year,
    month: investment.month,
    isPublished: investment.isPublished,
  });

  const handleChange = ({ name, value }) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

  return (
    <>
      <Container>
        <Backlink href="/admin/investments">Voltar</Backlink>
        <div style={{ height: 32 }} />
        <PageHeader
          title={`${toMonthName(investment.month)} de ${investment.year}`}
        />
        <InvestmentForm errors={errors} onChange={handleChange} data={data} />
        <InvestmentItems
          tollbar={tollbar}
          onDeleteItem={onDeleteItem}
          items={investment.items}
        />
      </Container>
      <Savebar
        onDelete={onDelete}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/investments")}
        loading={loading}
      />
    </>
  );
};

export default InvestmentDetailsPage;
