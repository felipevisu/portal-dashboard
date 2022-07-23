import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  InvestmentCreateMutation,
  InvestmentInput,
  ItemCreateInput,
  useInvestmentCreateMutation,
} from "@portal/graphql";
import { useModal } from "@portal/hooks";

import InvestmentCreatePage from "../components/InvestmentCreatePage";
import ItemCreateDialog from "../components/ItemCreateDialog";

export const InvestmentCreate = () => {
  const [items, setItems] = useState<ItemCreateInput[]>([]);
  const navigator = useNavigate();

  const handleSuccess = (data: InvestmentCreateMutation) => {
    if (!data?.investmentCreate.errors.length) {
      navigator(
        `/admin/investments/details/${data?.investmentCreate.investment.id}`
      );
    }
  };

  const [createInvestment, createInvestmentResult] =
    useInvestmentCreateMutation({
      onCompleted: handleSuccess,
    });

  const handleSubmit = async (data: InvestmentInput) => {
    await createInvestment({ variables: { input: { ...data, items } } });
  };

  const createModal = useModal();

  const handleAddItem = (item: ItemCreateInput) => {
    setItems([...items, item]);
    createModal.closeModal();
  };

  const handleDeleteItem = (index: number) => {
    setItems([...items.slice(0, index), ...items.slice(index + 1)]);
  };

  return (
    <>
      <InvestmentCreatePage
        onSubmit={handleSubmit}
        errors={createInvestmentResult.data?.investmentCreate.errors || []}
        loading={createInvestmentResult.loading}
        onCreateItem={createModal.openModal}
        onDeleteItem={handleDeleteItem}
        items={items}
      />
      <ItemCreateDialog
        isOpen={createModal.isOpen}
        onClose={createModal.closeModal}
        onConfirm={handleAddItem}
      />
    </>
  );
};

export default InvestmentCreate;
