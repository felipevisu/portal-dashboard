import React from "react";
import { useNavigate } from "react-router-dom";

import {
  InvestmentCreateMutation,
  InvestmentInput,
  useInvestmentCreateMutation,
} from "@portal/graphql";

import InvestmentCreatePage from "../components/InvestmentCreatePage";

export const InvestmentCreate = () => {
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
    await createInvestment({ variables: { input: { ...data } } });
  };

  return (
    <InvestmentCreatePage
      onSubmit={handleSubmit}
      errors={createInvestmentResult.data?.investmentCreate.errors || []}
      loading={createInvestmentResult.loading}
    />
  );
};

export default InvestmentCreate;
