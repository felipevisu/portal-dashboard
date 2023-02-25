import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@mui/material";
import {
  InvestmentCreateMutation,
  InvestmentInput,
  ItemCreateInput,
  useInvestmentCreateMutation,
} from "@portal/graphql";
import { useModal } from "@portal/hooks";

import InvestmentCreatePage from "../components/InvestmentCreatePage";
import ItemCreateDialog from "../components/ItemCreateDialog";
import ItemDeleteDialog from "../components/ItemDeleteDialog";

export const InvestmentCreate = () => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [items, setItems] = useState<ItemCreateInput[]>([]);

  const handleSuccess = (data: InvestmentCreateMutation) => {
    if (!data?.investmentCreate.errors.length) {
      navigator(`/investments/details/${data?.investmentCreate.investment.id}`);
    }
  };

  const [createInvestment, createInvestmentResult] =
    useInvestmentCreateMutation({
      onCompleted: handleSuccess,
    });

  const createItemModal = useModal();
  const deleteItemModal = useModal();

  const handleItemCreate = (item: ItemCreateInput) => {
    setItems([...items, item]);
    createItemModal.closeModal();
  };

  const handleItemDelete = () => {
    const index = searchParams.get("id");
    if (index) {
      setItems([
        ...items.slice(0, parseInt(index)),
        ...items.slice(parseInt(index) + 1),
      ]);
    }
    setSearchParams({});
    deleteItemModal.closeModal();
  };

  const handleSubmit = async (data: InvestmentInput) => {
    await createInvestment({ variables: { input: { ...data, items } } });
  };

  return (
    <>
      <InvestmentCreatePage
        onSubmit={handleSubmit}
        errors={createInvestmentResult.data?.investmentCreate.errors || []}
        loading={createInvestmentResult.loading}
        tollbar={
          <Button
            color="primary"
            variant="outlined"
            onClick={createItemModal.openModal}
          >
            {t("add")}
          </Button>
        }
        onDeleteItem={deleteItemModal.openModal}
        items={items.map((item, index) => {
          return {
            ...item,
            id: index.toString(),
            __typename: "Item",
          };
        })}
      />
      <ItemCreateDialog
        isOpen={createItemModal.isOpen}
        onClose={createItemModal.closeModal}
        onConfirm={handleItemCreate}
      />
      <ItemDeleteDialog
        isOpen={deleteItemModal.isOpen}
        onClose={deleteItemModal.closeModal}
        onConfirm={handleItemDelete}
      />
    </>
  );
};

export default InvestmentCreate;
