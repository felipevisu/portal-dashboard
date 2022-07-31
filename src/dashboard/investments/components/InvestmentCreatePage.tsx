import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import { ErrorFragment, InvestmentInput, ItemFragment } from "@portal/graphql";

import InvestmentForm, { FormProps } from "./InvestmentForm";
import InvestmentItems from "./InvestmentItems";

interface InvestmentCreatePageProps {
  onSubmit: (data: InvestmentInput) => Promise<void>;
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
  const navigate = useNavigate();
  const [data, setData] = useState<FormProps>({
    year: undefined,
    month: undefined,
    isPublished: false,
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

  return (
    <>
      <Backlink href="/admin/investments">Voltar</Backlink>
      <div style={{ height: 32 }} />
      <PageHeader title="Criar novo investimento" />
      <InvestmentForm errors={errors} onChange={handleChange} data={data} />
      <InvestmentItems
        tollbar={tollbar}
        items={items}
        onDeleteItem={onDeleteItem}
      />
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/investments")}
        loading={loading}
      />
    </>
  );
};

export default InvestmentCreatePage;
