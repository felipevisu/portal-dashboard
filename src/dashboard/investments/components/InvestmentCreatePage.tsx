import React from "react";

import { ErrorFragment } from "@portal/graphql";

interface InvestmentCreatePageProps {
  onSubmit: any;
  errors: ErrorFragment[];
  loading: boolean;
}

export const InvestmentCreatePage = ({
  onSubmit,
  errors,
  loading,
}: InvestmentCreatePageProps) => {
  return <div></div>;
};

export default InvestmentCreatePage;
