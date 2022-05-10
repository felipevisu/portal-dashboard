import React from "react";
import { useQuery } from "@apollo/client";

import { PROVIDER_LIST } from "../../graphql/queries";

export const ProviderList = () => {
  const { loading, error, data } = useQuery(PROVIDER_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <div>Relação de Fornecedores</div>;
};

export default ProviderList;
