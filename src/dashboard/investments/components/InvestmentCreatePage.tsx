import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Backlink } from "@portal/components/Backlink";
import Container from "@portal/components/Container";
import PageHeader from "@portal/components/PageHeader";
import { Savebar } from "@portal/components/Savebar";
import {
  ErrorFragment,
  InvestmentInput,
  ItemCreateInput,
} from "@portal/graphql";

import InvestmentForm, { FormProps } from "./InvestmentForm";
import InvestmentItems from "./InvestmentItems";

interface InvestmentCreatePageProps {
  onSubmit: (data: InvestmentInput) => Promise<void>;
  errors: ErrorFragment[];
  loading: boolean;
  onCreateItem: () => void;
  onDeleteItem: (index: number) => void;
  items: ItemCreateInput[];
}

export const InvestmentCreatePage = ({
  onSubmit,
  errors,
  loading,
  onCreateItem,
  onDeleteItem,
  items,
}: InvestmentCreatePageProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<FormProps>({
    year: null,
    month: null,
    isPublished: false,
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
        <PageHeader title="Criar novo investimento" />
        <InvestmentForm errors={errors} onChange={handleChange} data={data} />
        <InvestmentItems
          onCreateItem={onCreateItem}
          items={items}
          onDeleteItem={onDeleteItem}
        />
      </Container>
      <Savebar
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/investments")}
        loading={loading}
      />
    </>
  );
};

export default InvestmentCreatePage;
